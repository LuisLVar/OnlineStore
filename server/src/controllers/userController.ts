import { Request, Response } from 'express';

import database from '../database';

const nodemailer = require("nodemailer");

class UserController {

    public async list(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "SELECT * FROM USUARIO where estado != 3";
        await connect.exec(query, [], function (result: any) {
            res.send(result);
        });
    }


    public async getBitacoras(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `select a.email "ADMIN", u.email "USER", b.accion, b.descripcion,
         TO_CHAR(b.fecha,'DD/MM/YYYY HH24:MI:SS') "FECHA" from bitacora b, usuario a, usuario u 
        where b.id_admin = a.id_user and b.id_user = u.id_user`;
        await connect.exec(query, [], function (result: any) {
            res.send(result);
        });
    }

    public async listOne(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "SELECT * FROM USUARIO WHERE id_user = :id";
        await connect.exec(query, [req.params.id], function (result: any) {
            if (result.length > 0)
                return res.json(result[0]);
            else
                res.status(404).json({ text: "Usuario no existente" });
        });
    }

    public async getCarrito(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "SELECT * FROM CARRITO WHERE id_user = :id";
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }
    

    public async crearCarrito(req: Request, res: Response) { //POST -- AQUI CREO EL CARRITO DE COMPRAS.
        var connect = database.dbConnect();
        var query = 'INSERT INTO CARRITO VALUES(0, :id, sysdate)';
        console.log(req.body);
        await connect.exec(query, [req.body.id], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }

    public async create(req: Request, res: Response) { //POST -- AQUI CREO EL CARRITO DE COMPRAS.
        var connect = database.dbConnect();
        var query = 'INSERT INTO USUARIO VALUES(0, :tipo_user,:nombre,:apellido,:clave,' +
            ':email, :telefono, :fotografia, :genero, to_date(:fecha, \'YYYY-MM-DD\'), sysdate, :direccion, 10000, 0, \'Oro\', :estado, 0)';
        await connect.exec(query, [req.body.tipo_user, req.body.nombre, req.body.apellido, req.body.clave, req.body.email,
        req.body.telefono, req.body.fotografia, req.body.genero, req.body.fecha, req.body.direccion, req.body.estado], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }


    public async createClient(req: Request, res: Response) { //POST
        res.json(req.body);

        //ENVIO DE CORREO.
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });

        var mail_option = {
            from: 'Luis Vargas <>',
            to: req.body.email,
            subject: 'Confirmación de cuenta!',
            text: 'Hola ' + req.body.nombre + '!',
            html: '<h1>P&S</h1>' +
                ' <h3>Bienvenido ' + req.body.nombre + '</h3> ' +
                ' <ul> ' +
                ' <li>Usuario: ' + req.body.email + '</li> ' +
                ' <li>Password: ' + req.body.clave + '</li> ' +
                ' </ul>' +
                ' <p>SI DESCONOCES ESTE CORREO, IGNORARLO.</p> ' +
                ' <p>Ingresa al link, para confirmar tu correo</p> ' +
                ' <a href="http://192.168.1.7:3000/api/users/estado/' + req.body.id + '" class="btn btn-primary stretched-link">Confirmar Correo</a> '
        }

        transport.sendMail(mail_option, (error: any, info: any) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.json({ status: "1" });
        });
    }


    public async recuperarPwd(req: Request, res: Response) { //POST
        //res.json(req.body);

        var connect = database.dbConnect();
        var query = `UPDATE USUARIO SET
        clave = :clave where id_user = :id`;

        await connect.exec(query, [req.body.clave, req.body.id], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });

        //ENVIO DE CORREO.
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });

        var mail_option = {
            from: 'Luis Vargas <>',
            to: req.body.email,
            subject: 'Recuperacion de password!',
            text: 'Hola ' + req.body.nombre + '!',
            html: '<h1>P&S</h1>' +
                ' <h3>Hola ' + req.body.nombre + '</h3> ' +
                ' <h4>Recuperacion de password</h4> ' +
                ' <ul> ' +
                ' <li>Usuario: ' + req.body.email + '</li> ' +
                ' <li>Password: ' + req.body.clave + '</li> ' +
                ' </ul>' +
                ' <p>SI DESCONOCES ESTE CORREO, IGNORARLO.</p> ' +
                ' <p>Ingresa al link para regresar al login.</p> ' +
                ' <a href="http://192.168.1.7:4200/login" class="btn btn-primary stretched-link">Ingresar</a> '
        }

        transport.sendMail(mail_option, (error: any, info: any) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.json({ status: "1" });
        });
    }

    public async delete(req: Request, res: Response) { //DELETE
        var connect = database.dbConnect();
        var query = 'UPDATE USUARIO SET estado = 3 WHERE id_user = :id';
        var id = parseInt(req.params.id);
        await connect.exec(query, [id], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }

    public async update(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `UPDATE USUARIO SET
        tipo_user = :tipo_user,
        nombre = :nombre,
        apellido = :apellido,
        clave = :clave,
        email = :email,
        telefono = :telefono,
        fotografia = :fotografia,
        genero = :genero,
        fecha = to_date(:fecha,'YYYY-MM-DD'),
        direccion = :direccion
        where id_user = :id`;
        var id = parseInt(req.params.id);
        await connect.exec(query, [req.body.tipo_user, req.body.nombre, req.body.apellido, req.body.clave, req.body.email,
        req.body.telefono, req.body.fotografia, req.body.genero, req.body.fecha, req.body.direccion, id], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }

    public async setEstado(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `UPDATE USUARIO SET
        estado = 1 where id_user = :id`;

        var id = parseInt(req.params.id);
        await connect.exec(query, [id], function (result: any) {
            console.log(id);
            if (result == undefined)
                res.send("Cuenta confirmada");
            else
                res.send("Confirmacion incorrecta");
        });
    }

    public async newBitacora(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `begin llenarBitacora(:id1, :id2, :accion, :descripcion); end;`;

        var id1 = parseInt(req.body.admin);
        var id2 = parseInt(req.body.user);
        await connect.exec(query, [id1, id2, req.body.accion, req.body.descripcion], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json(req.body);
        });
    }


    //REPORTES

    public async reporte1(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `select u.id_user, u.nombre, u.apellido, u.email, ROUND(avg(p.punteo),2) as total 
        from USUARIO u, PUNTEO p where u.id_user = p.id_user  GROUP BY u.id_user, u.nombre, u.apellido, u.email order by total desc`;
        await connect.exec(query, [], function (result: any) {
            return res.json(result);
        });
    }

    public async reporte2(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `select id_user, nombre, apellido, email, to_char(fecha, 'DD/MM/YYYY') as Fecha from
         USUARIO where genero = 'M' and to_number(to_char(fecha, 'YYYY')) > :id`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async reporte3(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `select id_user, nombre, apellido, email, to_char(fecha, 'DD/MM/YYYY') as Fecha from
         USUARIO where genero = 'F' and to_number(to_char(fecha, 'YYYY')) < :id`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async reporte4(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `select id_user, nombre, apellido, email, ganancia  from USUARIO where ganancia > 0 order by ganancia desc`;
        await connect.exec(query, [], function (result: any) {
            return res.json(result);
        });
    }

    public async reporte5(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `SELECT P.id_producto, P.nombre, ROUND(avg(c.puntuacion), 2) as punteo FROM comentario c,
         producto p where c.id_producto = p.id_producto GROUP BY p.id_producto, p.nombre order by punteo desc`;
        await connect.exec(query, [], function (result: any) {
            return res.json(result);
        });
    }

    public async reporte6(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `select * from ( SELECT d.id_producto, p.nombre, sum(d.cantidad) as vendido FROM DETALLE_FACTURA d,
         PRODUCTO p where d.id_producto = p.id_producto GROUP BY d.id_producto, p.nombre order by vendido desc) where rownum <=3`;
        await connect.exec(query, [], function (result: any) {
            return res.json(result);
        });
    }

    public async reporte7(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `select pr.id_user, p.nombre, p.apellido, p.email, count(*) as Productos  from USUARIO p, PRODUCTO pr 
        where p.id_user = pr.id_user group by pr.id_user, p.nombre, p.apellido, p.email order by productos desc`;
        await connect.exec(query, [], function (result: any) {
            return res.json(result);
        });
    }
    public async reporte8(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `SELECT p.id_producto, p.nombre, p.precio, c.nombre as categoria FROM PRODUCTO p, CATEGORIA c where p.id_categoria = c.id_categoria`;
        await connect.exec(query, [], function (result: any) {
            return res.json(result);
        });
    }

    public async reporte9(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `SELECT c.id_producto, p.nombre, p.precio, count(*) as comentarios FROM PRODUCTO p, COMENTARIO c where
         p.id_producto = c.id_producto GROUP BY c.id_producto, p.nombre, p.precio ORDER BY comentarios desc`;
        await connect.exec(query, [], function (result: any) {
            return res.json(result);
        });
    }

    public async reporte10(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `SELECT p.id_producto, p.nombre, p.precio, p.cantidad FROM PRODUCTO p where p.cantidad = :id`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async reporte11(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `SELECT * FROM (SELECT P.id_producto, P.nombre, ROUND(avg(c.puntuacion), 2) as punteo FROM comentario c, producto p where
         c.id_producto = p.id_producto GROUP BY p.id_producto, p.nombre order by punteo asc) WHERE rownum <= 3`;
        await connect.exec(query, [], function (result: any) {
            return res.json(result);
        });
    }


    public async isOnline(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `UPDATE USUARIO SET conexion = 1 where id_user = :id`;
        var id = parseInt(req.params.id);
        await connect.exec(query, [id], function (result: any) {
            console.log(id);
            if (result == undefined)
                res.send({estado: 1});
            else
                res.send({estado: 0});
        });
    }

    public async isOffline(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `UPDATE USUARIO SET conexion = 0 where id_user = :id`;
        var id = parseInt(req.params.id);
        await connect.exec(query, [id], function (result: any) {
            console.log(id);
            if (result == undefined)
                res.send({estado: 1});
            else
                res.send({estado: 0});
        });
    }

    //CHAT
    public async newChat(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `insert into chat values(0, :a, :b, 1)`;
        await connect.exec(query, [req.body.cliente, req.body.helpdesk], function (result: any) {
            if (result == undefined)
                res.send({estado: 1});
            else
                res.send({estado: 0});
        });
    }

    public async sendMsg(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `insert into mensaje values(:a, :b, :c, sysdate, :c)`;
        await connect.exec(query, [req.body.chat, req.body.emisor, req.body.mensaje, req.body.eshd], function (result: any) {
            if (result == undefined)
                res.send({estado: 1});
            else
                res.send({estado: 0});
        });
    }

    public async getMensajes(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `SELECT * FROM MENSAJE WHERE id_chat = :id`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async getChatHelpDesk(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `select c.id_chat, c.id_user, u.nombre, c.id_helpdesk, c.estado from CHAT c, USUARIO u where c.id_helpdesk = :id and c.id_user = u.id_user`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async getChatUser(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `select c.id_chat, c.id_user, u.nombre, c.id_helpdesk, c.estado from CHAT c, USUARIO u where c.id_user = :id and c.id_helpdesk = u.id_user`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async getHelpDesk(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `SELECT id_user from USUARIO where conexion = 1 and tipo_user = '2'`;
        await connect.exec(query, [], function (result: any) {
            return res.json(result);
        });
    }

    public async getMsg(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `select id_chat, id_emisor, mensaje, TO_CHAR(fecha,'DD/MM/YYYY HH24:MI:SS') as fecha, esHD from mensaje where id_chat = :id order by fecha`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }


    public async punteo(req: Request, res: Response) { //PUT
        var connect = database.dbConnect();
        var query = `insert into punteo values(:a, :b)`;
        await connect.exec(query, [req.body.user, req.body.punteo], function (result: any) {
            if (result == undefined)
                res.send({estado: 1});
            else
                res.send({estado: 0});
        });
    }
    





}

export const userController = new UserController();