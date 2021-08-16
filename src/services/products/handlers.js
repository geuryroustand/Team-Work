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

export const deleteProduct = async(req, res) => {
    try {
        await product.delete(req.params.id)
        res.status(200).send({ message: 'successfully deleted' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }
}

export const updateProduct = async(req, res) => {
    try {
        const updatedProduct = await product.update(req.params.id, req.body)
        res.status(200).send(updatedProduct)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const productHandlers = {
    list: listProducts,
    create: createProduct,
    delete: deleteProduct,
    update: updateProduct
}

export default productHandlers