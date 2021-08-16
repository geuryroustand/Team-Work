import product from "../../utils/fs-utils.js";

export const listProducts = async (req, res) => {
  try {
    const productsList = await product.read();
    res.send(productsList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await product.new(req.body);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const img = await product.image(req.params.id, req.file);
    res.status(200).send(img);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const productHandlers = {
  list: listProducts,
  create: createProduct,
  imgURL: uploadImage,
};

export default productHandlers;
