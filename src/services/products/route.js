import { Router } from "express";
import productHandlers from "./handlers.js";
import multer from "multer";
import {
  checkProductSchema,
  checkSearchSchema,
  checkValidResult,
} from "./validation.js";

const fileParse = multer();

const productService = Router();

productService.get("/", productHandlers.list);

productService.post(
  "/",
  checkProductSchema,
  checkValidResult,
  productHandlers.create
);

productService.delete("/:id", productHandlers.delete);

productService.put("/:id", productHandlers.update);

productService.get("/filter", productHandlers.getCategory);

productService.get("/:id/reviews", productHandlers.reviewList);

productService.put("/:id/img", fileParse.single("img"), productHandlers.imgURL);

export default productService;
