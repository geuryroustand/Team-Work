import { fileURLToPath } from "url";
import { extname, dirname, join } from "path";
import fs from "fs-extra";
import uniqid from "uniqid";

export const productsJSONPath = join(
    dirname(fileURLToPath(
        import.meta.url)),
    "../data/products.json"
);

export const publicJSONPath = join(
    dirname(fileURLToPath(
        import.meta.url)),
    "../../public"
);

export const readProduct = async() => {
    try {
        const products = await fs.readJSON(productsJSONPath);
        return products;
    } catch (error) {
        throw error;
    }
};
export let id
export const writeProduct = async(content) => {
    try {
        id = uniqid()
        const products = await readProduct();
        const newProduct = {
            id: id,
            ...content,
            createdAt: new Date().toISOString(),
        };
        products.push(newProduct);
        await fs.writeJSON(productsJSONPath, products);
        return newProduct;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async(id, content) => {
    try {
        const products = await readProduct();
        let productIndex = products.findIndex((product) => product.id === id);
        if (productIndex != -1) {
            let product = products[productIndex];
            product = {
                id,
                ...product,
                ...content,
                updatedAt: new Date().toISOString(),
            };
            products[productIndex] = product;
            await fs.writeJSON(productsJSONPath, products);
            return product;
        }
    } catch (error) {
        throw new Error(`product with ${id} not found`);
    }
};

export const uploadFile = async(id, file) => {
    try {
        // const { originalname, buffer } = req.file;
        const extention = extname(file.originalname);
        const fileName = `${id}${extention}`;
        const pathToFile = join(publicJSONPath, fileName);
        await fs.writeFile(pathToFile, file.buffer);
        const link = `http://localhost:3003/${fileName}`;
        const postImage = await updateProduct(id, { imageUrl: link });
        // console.log(
        //   `req.file =>📁: ${req.file}, fs.writeFile(pathToFile, buffer) is => 🏁: ${fileName}`
        // );
        return postImage;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async(id) => {
    try {
        let products = await readProduct();
        products = products.filter((product) => product.id !== id);
        await fs.writeJSON(productsJSONPath, products);
    } catch (error) {
        throw error;
    }
};



export const listCategory = async(category) => {
    try {
        console.log({ category });
        const products = await readProduct();
        const categoryList = products.filter(
            (product) => product.category === category
        );
        return categoryList;
    } catch (error) {
        throw error;
    }
};



const product = {
    new: writeProduct,
    read: readProduct,
    delete: deleteProduct,
    update: updateProduct,
    getCategory: listCategory,
    image: uploadFile,
};

export default product;