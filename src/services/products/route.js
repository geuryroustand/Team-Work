import { Router } from 'express'
import productHandlers from './handlers.js'

const productService = Router()

productService.get('/', productHandlers.list)

productService.post('/', productHandlers.create)

productService.delete('/:id', productHandlers.delete)

productService.put('/:id', productHandlers.update)

export default productService