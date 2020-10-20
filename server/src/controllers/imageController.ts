import {Request, Response} from 'express';

class ImageController{

    public index (req: Request, res:Response){
        res.json(req.body);
    }
    
    
    public getIndex (req: Request, res:Response){
        res.json({
            text: 'Listo para recibir bro'
        });
    } 

}

export const imageController = new ImageController();