import { Router } from 'express';
import { userController} from '../controllers/userController'

class UserRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', userController.list);
        this.router.get('/bitacora', userController.getBitacoras);
        this.router.get('/:id', userController.listOne);
        this.router.post('/', userController.create);
        this.router.post('/bitacora', userController.newBitacora);
        this.router.post('/registro', userController.createClient);
        this.router.post('/recuperar', userController.recuperarPwd);
        this.router.get('/estado/:id', userController.setEstado);
        this.router.get('/carrito/:id', userController.getCarrito);
        this.router.post('/carrito', userController.crearCarrito);
        this.router.delete('/:id', userController.delete);
        this.router.put('/:id', userController.update);
        this.router.get('/rep/1', userController.reporte1);
        this.router.get('/rep/2/:id', userController.reporte2);
        this.router.get('/rep/3/:id', userController.reporte3);
        this.router.get('/rep/4', userController.reporte4);
        this.router.get('/rep/5', userController.reporte5);
        this.router.get('/rep/6', userController.reporte6);
        this.router.get('/rep/7', userController.reporte7);
        this.router.get('/rep/8', userController.reporte8);
        this.router.get('/rep/9', userController.reporte9);
        this.router.get('/rep/10/:id', userController.reporte10);
        this.router.get('/rep/11', userController.reporte11);
        this.router.get('/online/:id', userController.isOnline);
        this.router.get('/offline/:id', userController.isOffline);
        this.router.post('/chat/new', userController.newChat);
        this.router.post('/msg/new', userController.sendMsg);
        this.router.get('/chathp/:id', userController.getChatHelpDesk);
        this.router.get('/chatuser/:id', userController.getChatUser);
        this.router.get('/gethd/hd', userController.getHelpDesk);
        this.router.get('/chat/get/:id', userController.getMsg);
        this.router.post('/chat/punteo', userController.punteo);
        
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;