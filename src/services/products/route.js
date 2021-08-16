import { Router } from "express";
import productHandlers from "./handlers.js";
import multer from "multer";

const fileParse = multer();

const productService = Router();

productService.get("/", productHandlers.list);


productService.delete('/:id', productHandlers.delete)

productService.put('/:id', productHandlers.update)

productService.get('/filter', productHandlers.getCategory)

export default productService

productService.get("/:id/reviews", productHandlers.list);



productService.put("/:id/img", fileParse.single("img"), productHandlers.imgURL);

export default productService;

