import { Request, Response } from 'express';

import database from '../database';

class PortadaController {

    public async getPortada(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "SELECT * FROM PORTADA";
        await connect.exec(query, [], function (result: any) {
            res.send(result);
        });
    }

    public async updatePortada(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `update portada set 
        nombre = :nombre,
        slogan = :slogan,
        imagen = :imagen,
        mision = :mision,
        vision = :vision,
        about = :about,
        video = :video  where rownum = 1`;
        await connect.exec(query, [req.body.nombre, req.body.slogan, req.body.imagen, req.body.mision,req.body.vision, req.body.about, req.body.video], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json(result);
        });
    }
}

export const portadaController = new PortadaController();