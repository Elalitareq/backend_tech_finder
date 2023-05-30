import express from "express";
import {
  addProduct,
  updateProduct,
  getProducts,
  getTechnicianProducts,
} from "../controllers/productController.js";
import { allowAccess, verifyToken } from "../middlewares/authentication.js";

const productRouter = express.Router();

// Add a new product
productRouter.post("/", verifyToken, allowAccess(["technician"]), addProduct);

// Update an existing product
productRouter.put(
  "/:id",
  verifyToken,
  allowAccess(["technician"]),
  updateProduct
);

// Get all products with pagination and search filtration
productRouter.get("/", getProducts);
productRouter.get("/:id", getTechnicianProducts);

export default productRouter;
