"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
class ProductRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', productController_1.productController.listProducts);
        this.router.get('/one/:id', productController_1.productController.listOneProduct);
        this.router.get('/:id', productController_1.productController.listUserProducts);
        this.router.post('/', productController_1.productController.create);
        this.router.delete('/:id', productController_1.productController.delete);
        this.router.put('/:id', productController_1.productController.update);
        this.router.get('/comments/:id', productController_1.productController.listComments);
        this.router.post('/comments', productController_1.productController.newComment);
        this.router.get('/comments/avg/:id', productController_1.productController.getAVG);
        this.router.get('/comments/count/:id/:idp', productController_1.productController.getStars);
        this.router.get('/carrito/:id', productController_1.productController.getCarrito);
        this.router.get('/carro/:id', productController_1.productController.getCarro);
        this.router.get('/carrito/:idc/:idp', productController_1.productController.eliminarCarrito);
        this.router.post('/carrito/add', productController_1.productController.addProduct);
        this.router.post('/factura', productController_1.productController.newFactura);
        this.router.get('/factura/:id', productController_1.productController.getFactura);
        this.router.post('/detalle', productController_1.productController.newDetalleFactura);
        this.router.delete('/borrarcarrito/:id', productController_1.productController.borrarCarrito);
        this.router.post('/sendbill', productController_1.productController.sendFactura);
        this.router.get('/categoria/list', productController_1.productController.getCategoria);
        this.router.post('/addcategoria', productController_1.productController.addCategoria);
    }
}
const productRoutes = new ProductRoutes();
exports.default = productRoutes.router;
