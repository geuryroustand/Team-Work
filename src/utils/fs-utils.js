import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs-extra'
import uniqid from 'uniqid'

const productsJSONPath = join(dirname(fileURLToPath(
    import.meta.url)), '../data/products.json')

export const readProduct = async() => {
    try {
        const products = await fs.readJSON(productsJSONPath)
        return products
    } catch (error) {
        throw (error)
    }
}

export const writeProduct = async(content) => {
    try {
        const products = await readProduct()
        const newProduct = { id: uniqid(), ...content, createdAt: new Date().toISOString() }
        products.push(newProduct)
        await fs.writeJSON(productsJSONPath, products)
        return newProduct
    } catch (error) {
        throw error
    }
}

export const deleteProduct = async(id) => {
    try {
        let products = await readProduct()
        products = products.filter((product) => product.id !== id)
        await fs.writeJSON(productsJSONPath, products)
    } catch (error) {
        throw (error)
    }
}

export const updateProduct = async(id, content) => {
    try {
        const products = await readProduct()
        let productIndex = products.findIndex((product) => product.id === id)
        if (productIndex != -1) {
            let product = products[productIndex]
            product = {
                id,
                ...product,
                ...content,
                updatedAt: new Date().toISOString()
            }
            products[productIndex] = product
            await fs.writeJSON(productsJSONPath, products)
            return product
        }
    } catch (error) {
        throw new Error(`product with ${id} not found`)
    }
}

export const listCategory = async(category) => {
    try {
        console.log({ category })
        const products = await readProduct()
        const categoryList = products.filter((product) => product.category === category)
        return categoryList
    } catch (error) {
        throw (error)
    }
}

const product = {
    new: writeProduct,
    read: readProduct,
    delete: deleteProduct,
    update: updateProduct,
    getCategory: listCategory
}

export default product