import { Router } from 'express';
import { productController } from '../controllers/productController';

class ProductRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', productController.listProducts);
        this.router.get('/one/:id', productController.listOneProduct);
        this.router.get('/:id', productController.listUserProducts);
        this.router.post('/', productController.create);
        this.router.delete('/:id', productController.delete);
        this.router.put('/:id', productController.update);
        this.router.get('/comments/:id', productController.listComments);
        this.router.post('/comments', productController.newComment);
        this.router.get('/comments/avg/:id', productController.getAVG);
        this.router.get('/comments/count/:id/:idp', productController.getStars);
        this.router.get('/carrito/:id', productController.getCarrito);
        this.router.get('/carro/:id', productController.getCarro);
        this.router.get('/carrito/:idc/:idp', productController.eliminarCarrito);
        this.router.post('/carrito/add', productController.addProduct);
        this.router.post('/factura', productController.newFactura);
        this.router.get('/factura/:id', productController.getFactura);
        this.router.post('/detalle', productController.newDetalleFactura);
        this.router.delete('/borrarcarrito/:id', productController.borrarCarrito);
        this.router.post('/sendbill', productController.sendFactura);
        this.router.get('/categoria/list', productController.getCategoria);
        this.router.post('/addcategoria', productController.addCategoria);
    }
}

const productRoutes = new ProductRoutes();
export default productRoutes.router;