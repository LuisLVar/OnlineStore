import { Router } from 'express';
import { portadaController } from '../controllers/portadaController';

class PortadaRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', portadaController.getPortada);
        this.router.put('/', portadaController.updatePortada);
    }
}

const portadaRoutes = new PortadaRoutes();
export default portadaRoutes.router;