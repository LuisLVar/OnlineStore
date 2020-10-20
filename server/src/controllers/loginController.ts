import {Request, Response} from 'express';

import database from '../database';

class LoginController{

    public async getLogin(req: Request, res:Response){ //GET
            var connect = database.dbConnect();
            var query = "SELECT * FROM USUARIO WHERE email = :email and clave = :clave";;
            await connect.exec(query,[req.body.email, req.body.clave],function(result:any){
                res.send(result);
            });
    }

    public async getLoginEmail(req: Request, res:Response){ //GET
        var connect = database.dbConnect();
        var query = "SELECT * FROM USUARIO WHERE email = :email";;
        await connect.exec(query,[req.body.email],function(result:any){
            res.send(result);
        });
}
}

export const loginController = new LoginController();