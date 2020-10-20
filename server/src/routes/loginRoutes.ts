import { Router } from 'express';
import { loginController } from '../controllers/loginController';

class LoginRoutes{

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', loginController.getLogin);
        this.router.post('/pwd', loginController.getLoginEmail);
    }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;