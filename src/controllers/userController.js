import bcrypt from "bcryptjs";
import { UserModel } from "../models/user.js";
import jwt from "jsonwebtoken";

function generatePassword(length) {
  // Create an array of possible characters.
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+{}[]:<>?,.;'`";

  // Generate a random password of the specified length.
  const password = Array(length)
    .fill(0)
    .map((_, i) => chars.charAt(Math.floor(Math.random() * chars.length)));

  // Return the password.
  return password.join("");
}

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" } // Shorter expiration for access token
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // Longer expiration for refresh token
  );
};
class UserController {
  register = async (req, res, next) => {
    const { password, role, ...result } = req.body;
    const newPassword = await bcrypt.hash(password, 10);
    if (role === "admin") {
      return res
        .status(700)
        .send({ success: false, message: "are you crazy?" });
    }
    result.password = newPassword;
    result.role = role;
    try {
      UserModel.create(result)
        .then((user) => {
          if (!user) {
            return res
              .status(400)
              .send({ success: false, message: "An error occurred" });
          }

          res.status(201).send({
            success: true,
            message: "User created successfully",
            user,
          });
        })
        .catch((err) => {
          return res
            .status(500)
            .send({ success: false, message: err.message, err });
        });
    } catch (err) {
      res.status(500).send({ success: false, message: err.message, err });
    }
  };
  registrationByAdmin = async (req, res, next) => {
    const { password, ...result } = req.body;
    const newPassword = await bcrypt.hash(password, 10);
    result.password = newPassword;
    try {
      UserModel.create(result)
        .then((user) => {
          if (!user) {
            return res
              .status(400)
              .send({ success: false, message: "An error occurred" });
          }

          res.status(201).send({
            success: true,
            message: "User created successfully",
            user,
          });
        })
        .catch((err) => {
          return res
            .status(400)
            .send({ success: false, message: err.message, err });
        });
    } catch (err) {
      res.status(500).send({ success: false, message: err.message, err });
    }
  };
  login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .send({ success: false, message: "Email and Password are required" });
    }
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "Email not found" });
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return res
          .status(401)
          .send({ success: false, message: "Password incorrect" });
      }
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      user.password = "ha ha ha";

      // Set a cookie named "accessToken" with the value of the accessToken
      res.cookie("accessToken", accessToken, { httpOnly: true });

      res.status(200).send({
        success: true,
        message: "Logged in successfully",
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error", error });
    }
  };
   googleOrGithubLogin=async()=> {
    const { email, googleId, githubId, name } = req.body;
    const user = await UserModel.findOne({
      email,
      googleId,
      githubId,
    });
  
    if (!user) {
      user = await UserModel.create({
        email,
        googleId,
        githubId,
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
        password: generatePassword(8),
        role:"user",
      });
    }
  
    if (user) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  }
  refreshAccessToken = async (req, res, next) => {
    const { refreshToken } = req.body;

    try {
      // Verify the refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Check if the user exists
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "User not found" });
      }

      // Generate a new access token
      const accessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" } // Set the expiration time as desired
      );

      res.status(200).send({ success: true, accessToken });
    } catch (error) {
      res
        .status(401)
        .send({ success: false, message: "Invalid refresh token" });
    }
  };
  deleteSelfAccount = async (req, res, next) => {
    const userId = req.user._id;
    const { password } = req.body;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }

      // Check if the provided password matches the user's password
      if (!(await bcrypt.compare(password, user.password))) {
        return res
          .status(401)
          .send({ success: false, message: "Password incorrect" });
      }

      // Delete the user account
      await UserModel.findByIdAndDelete(userId);

      res
        .status(200)
        .send({ success: true, message: "Account deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "Internal Server Error",
          error: error,
        });
    }
  };
  deleteAccount = async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await UserModel.findById(id);
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }

      await UserModel.findByIdAndDelete(id);

      res
        .status(200)
        .send({ success: true, message: "Account deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .send({
          success: false,
          message: "Internal Server Error",
          error: error,
        });
    }
  };
  get = async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user)
        return res
          .status(404)
          .send({
            success: false,
            message: `User with ID ${req.params.id} does not exist`,
          });
      res.status(200).send({ success: true, user });
    } catch (err) {
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error", err: err });
    }
  };
  getSelf = async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.user._id);
      if (!user)
        return res
          .status(404)
          .send({
            success: false,
            message: `User with ID ${req.user._id} does not exist`,
          });
      res.status(200).send({ success: true, user });
    } catch (err) {
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error", err: err });
    }
  };
  getAll = async (req, res, next) => {
    const filter = {}
    const query = req.query.q
      if(query){
      filter.firstName=query
      }
    try {
      const users = await UserModel.find(filter);
      if (!users)
        return res
          .status(404)
          .send({ success: false, message: `No users are found` });
      res.status(200).send({ success: true, users });
    } catch (err) {
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error", err: err });
    }
  };
  updatePassword = async (req, res, next) => {
    try {
      const id = req.user._id;
      const password = req.body.password;
      const newPassword = req.body.newPassword;

      const user = await UserModel.findById(id);
      if (!user)
        return res
          .status(404)
          .send({ success: false, message: `User not found` });
      if (!(await bcrypt.compare(password, user.password)))
        return res
          .status(401)
          .send({ success: false, message: `Password mismatch` });
      user.password = await bcrypt.hash(newPassword, 10);
      user.save();
      res
        .status(200)
        .send({
          success: true,
          message: `Password Updated Successfully`,
          user,
        });
    } catch (err) {
      res
        .status(500)
        .send({ success: false, message: "Internal Server Error", err });
    }
  };
  updateProfile = async (req, res, next) => {
    try {
      const id = req.user._id;
      const { email, firstName, lastName, role } = req.body;
      if (role == "admin") {
        return res
          .status(700)
          .send({ success: false, message: "are you crazy?" });
      }
      let user = await UserModel.findById(id);
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }
      let update = {};
      if (role) update.role = role;
      if (email) update.email = email;
      if (firstName) update.firstName = firstName;
      if (lastName) update.lastName = lastName;
      let updatedUser = await UserModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      res
        .status(200)
        .send({
          success: true,
          message: "User Updated successfully",
          updatedUser,
        });
    } catch (err) {
      res.status(500).send({ success: false, message: err.message, err });
    }
  };
  updateProfileByAdmin = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { email, firstName, lastName, role } = req.body;
      let user = await UserModel.findById(id);
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }
      if (role) user.role = role;
      if (email) user.email = email;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      user.save();
      res
        .status(200)
        .send({ success: true, message: "User Updated successfully", user });
    } catch (err) {
      res.status(500).send({ success: false, message: err.message, err });
    }
  };
}

const userController = new UserController();

export default userController;
