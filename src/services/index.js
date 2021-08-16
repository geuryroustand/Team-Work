import { Router } from 'express'
import productService from './products/route.js'

const services = Router()
services.use('/products', productService)

export default services