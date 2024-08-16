import express from "express";
import bodyParser from "body-parser";
import { products } from '../model/index.js'

const productRouter = express.Router()
productRouter.use(bodyParser.json())

productRouter.get('/', (req, res) => {
    products.fetchProducts(req, res)
})

productRouter.get('/product/:id', (req, res) => {
    products.fetchProduct(req, res)
})

productRouter.get('/recent', (req, res) => {
    products.recentProducts(req, res)
})

productRouter.post('/product/add', (req, res) => {
    products.addProduct(req, res)
})

productRouter.patch('/product/:id', (req, res) => {
    products.updateProduct(req, res)
})

productRouter.delete('/product/:id', (req, res) => {
    products.deleteProduct(req, res)
})

export {
    express,
    productRouter
}