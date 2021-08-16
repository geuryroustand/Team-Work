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

const product = {
    new: writeProduct,
    read: readProduct
}

export default product