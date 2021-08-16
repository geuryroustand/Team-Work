import { Router } from 'express'
import productHandlers from './handlers.js'

const productService = Router()

productService.get('/', productHandlers.list)

productService.post('/', productHandlers.create)

export default productService