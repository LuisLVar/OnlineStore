"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', userController_1.userController.list);
        this.router.get('/bitacora', userController_1.userController.getBitacoras);
        this.router.get('/:id', userController_1.userController.listOne);
        this.router.post('/', userController_1.userController.create);
        this.router.post('/bitacora', userController_1.userController.newBitacora);
        this.router.post('/registro', userController_1.userController.createClient);
        this.router.post('/recuperar', userController_1.userController.recuperarPwd);
        this.router.get('/estado/:id', userController_1.userController.setEstado);
        this.router.get('/carrito/:id', userController_1.userController.getCarrito);
        this.router.post('/carrito', userController_1.userController.crearCarrito);
        this.router.delete('/:id', userController_1.userController.delete);
        this.router.put('/:id', userController_1.userController.update);
        this.router.get('/rep/1', userController_1.userController.reporte1);
        this.router.get('/rep/2/:id', userController_1.userController.reporte2);
        this.router.get('/rep/3/:id', userController_1.userController.reporte3);
        this.router.get('/rep/4', userController_1.userController.reporte4);
        this.router.get('/rep/5', userController_1.userController.reporte5);
        this.router.get('/rep/6', userController_1.userController.reporte6);
        this.router.get('/rep/7', userController_1.userController.reporte7);
        this.router.get('/rep/8', userController_1.userController.reporte8);
        this.router.get('/rep/9', userController_1.userController.reporte9);
        this.router.get('/rep/10/:id', userController_1.userController.reporte10);
        this.router.get('/rep/11', userController_1.userController.reporte11);
        this.router.get('/online/:id', userController_1.userController.isOnline);
        this.router.get('/offline/:id', userController_1.userController.isOffline);
        this.router.post('/chat/new', userController_1.userController.newChat);
        this.router.post('/msg/new', userController_1.userController.sendMsg);
        this.router.get('/chathp/:id', userController_1.userController.getChatHelpDesk);
        this.router.get('/chatuser/:id', userController_1.userController.getChatUser);
        this.router.get('/gethd/hd', userController_1.userController.getHelpDesk);
        this.router.get('/chat/get/:id', userController_1.userController.getMsg);
        this.router.post('/chat/punteo', userController_1.userController.punteo);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
