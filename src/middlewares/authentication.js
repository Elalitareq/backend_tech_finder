import jwt from "jsonwebtoken"
import { UserModel } from "../models/user.js"

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .send({ success: false, message: "Token is not available" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res
          .status(403)
          .send({ success: false, message: "Token expired or is invalid" });
      }
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res
          .status(403)
          .send({ success: false, message: "Token is invalid" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(403)
        .send({ success: false, message: "Token expired or is invalid" });
    }
  };
  
export const allowAccess=(arr)=>{
    return (req,res,next)=>{
        if(arr.includes(req.user.role)){
            next()
        }else{
            return res.status(403).send({success:false, message:"Access denied"})
        }
    }

}