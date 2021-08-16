import product from '../../utils/fs-utils.js'

export const listProducts = async(req, res) => {
    try {
        const productsList = await product.read()
        res.send(productsList)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const createProduct = async(req, res) => {
    try {
        const newProduct = await product.new(req.body)
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const productHandlers = {
    list: listProducts,
    create: createProduct
}

export default productHandlers