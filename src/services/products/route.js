import { Router } from "express";
import productHandlers from "./handlers.js";
import multer from "multer";

const fileParse = multer();

const productService = Router();

productService.get("/", productHandlers.list);

productService.get("/:id/reviews", productHandlers.list);

productService.post("/", productHandlers.create);

productService.put("/:id/img", fileParse.single("img"), productHandlers.imgURL);

export default productService;
