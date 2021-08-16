import product from "../../utils/fs-utils.js";
import { readReviews } from '../../readAndWrite/readAndWrite.js'

export const listProducts = async(req, res) => {
    try {
        const productsList = await product.read();
        res.send(productsList);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// export const productReview = async (req, res) => {
//   try {
//     const productsList = await product.read();
//     const product = productsList.filter(pro => pro.id === req.params.id)
//     if (product){
//       const
//     }
//     // res.send(productsList);

//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };

export const createProduct = async(req, res) => {
    try {
        const newProduct = await product.new(req.body);
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const uploadImage = async(req, res, next) => {
    try {
        const img = await product.image(req.params.id, req.file);
        res.status(200).send(img);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const deleteProduct = async(req, res) => {
    try {
        await product.delete(req.params.id);
        res.status(200).send({ message: "successfully deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
};

export const updateProduct = async(req, res) => {
    try {
        const updatedProduct = await product.update(req.params.id, req.body);
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const listCategory = async(req, res) => {
    try {
        console.log({ q: req.query });
        const productCategory = await product.getCategory(req.query.category);
        res.send(productCategory);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

export const reviewList = async(req, res) => {
    try {
        const newProduct = await product.reviewList(req.params.id)
            //console.log(newProduct[0].id)
        const id = newProduct[0].id;
        const reviews = await readReviews()
            //console.log(reviews)
        const review = reviews.filter((review) => review.productId === id)
            //console.log(review)
        res.send(review)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message });
    }
}


const productHandlers = {
    list: listProducts,
    create: createProduct,
    delete: deleteProduct,
    update: updateProduct,
    getCategory: listCategory,
    imgURL: uploadImage,
    reviewList: reviewList
};

export default productHandlers;