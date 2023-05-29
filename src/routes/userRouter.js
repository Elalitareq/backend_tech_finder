import userController from "../controllers/userController.js";
import express from "express";
import { allowAccess, verifyToken } from "../middlewares/authentication.js";

const test = (req, res, next) => {
  console.log("test");
  next();
};
let userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post(
  "/register/admin",
  verifyToken,
  allowAccess(["admin"]),
  userController.registrationByAdmin
);
userRouter.post("/login", userController.login);
userRouter.post("/google/login", userController.googleOrGithubLogin);
userRouter.post("/refresh", userController.refreshAccessToken);
userRouter.delete("/self", verifyToken, userController.deleteSelfAccount);
userRouter.delete(
  "/other/:id",
  verifyToken,
  allowAccess(["admin"]),
  userController.deleteAccount
);
userRouter.get(
  "/users",
  verifyToken,
  allowAccess(["admin"]),
  test,
  userController.getAll
);
userRouter.get(
  "/user/:id",
  verifyToken,
  allowAccess(["admin"]),
  userController.get
);
userRouter.get("/self", verifyToken, userController.getSelf);
userRouter.patch("/password", verifyToken, userController.updatePassword);
userRouter.patch("/self", verifyToken, userController.updateProfile);
userRouter.patch(
  "/other/:id",
  verifyToken,
  allowAccess(["admin"]),
  userController.updateProfileByAdmin
);

export default userRouter;
