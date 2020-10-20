import { Request, Response } from 'express';
const nodemailer = require("nodemailer");

import database from '../database';

class ProductController {

    public async listProducts(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "SELECT * FROM PRODUCTO";
        await connect.exec(query, [], function (result: any) {
            res.send(result);
        });
    }

    public async listUserProducts(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "SELECT * FROM PRODUCTO WHERE id_user = :id";
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async listOneProduct(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `SELECT p.ID_PRODUCTO, p.nombre, p.imagen, p.descripcion, p.id_categoria, c.nombre "categoria", p.precio, p.fecha_publicacion,
         p.cantidad, p.id_user from PRODUCTO p, CATEGORIA c where p.id_categoria = c.id_categoria and p.id_producto = :id`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async create(req: Request, res: Response) { //POST
        var connect = database.dbConnect();

        var query = 'INSERT INTO PRODUCTO VALUES(0, :nombre,:imagen,:descripcion,:id_categoria,' +
            ':precio, sysdate, :cantidad, :id_user)';
        await connect.exec(query, [req.body.nombre, req.body.imagen, req.body.descripcion, req.body.id_categoria, req.body.precio,
        req.body.cantidad, req.body.id_user], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }

    public async delete(req: Request, res: Response) { //DELETE
        var connect = database.dbConnect();
        var query = 'DELETE FROM PRODUCTO WHERE id_producto = :id';
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
        var query = `UPDATE PRODUCTO SET
        nombre = :nombre,
        imagen = :imagen,
        descripcion = :descripcion,
        id_categoria = :id_categoria,
        precio = :precio,
        cantidad = :cantidad
        where id_producto = :id`;
        var id = parseInt(req.params.id);
        await connect.exec(query, [req.body.nombre, req.body.imagen, req.body.descripcion, req.body.id_categoria,
        req.body.precio, req.body.cantidad, id], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }

    public async listComments(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "SELECT c.id_producto, c.id_user, c.titulo, c.comentario, TO_CHAR(c.fecha,'DD/MM/YYYY HH24:MI:SS') \"FECHA\", u.nombre as \"NOMBREUSER\"," +
            "c.puntuacion FROM COMENTARIO c, USUARIO u where c.id_user = u.id_user and c.id_producto = :id";
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async newComment(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "INSERT INTO COMENTARIO VALUES(:id_producto, :id_user, :titulo, :comentario, sysdate, :nombreUser, :puntuacion)";
        await connect.exec(query, [req.body.id_producto, req.body.id_user, req.body.titulo, req.body.comentario,
        req.body.nombreUser, req.body.puntuacion], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }

    public async getAVG(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "select ROUND(avg(puntuacion), 2) \"Punteo\" from comentario where id_producto = :id";
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async getStars(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "select count(*) \"Estrellas\" from comentario where id_producto = :id and puntuacion = :idp";
        await connect.exec(query, [req.params.id, req.params.idp], function (result: any) {
            return res.json(result);
        });
    }

    public async getCarrito(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `SELECT d.id_carrito, d.id_producto, p.nombre, d.cantidad, d.precio,
         (d.cantidad * d.precio) "Total" FROM DETALLE_CARRITO d, CARRITO c,
          PRODUCTO p WHERE c.id_user = :id and d.id_carrito = c.id_carrito and d.id_producto = p.id_producto`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async getCarro(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `select * from carrito where id_user = :a`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }



    public async eliminarCarrito(req: Request, res: Response) { //DELETE
        var connect = database.dbConnect();
        var query = `delete from detalle_carrito where id_carrito = :idc and id_producto = :idp`;
        await connect.exec(query, [req.params.idc, req.params.idp], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }

    public async addProduct(req: Request, res: Response) { //DELETE
        var connect = database.dbConnect();
        var query = `INSERT INTO DETALLE_CARRITO VALUES(:a, :b, :c, :d)`;
        await connect.exec(query, [req.body.idc, req.body.idp, req.body.cantidad, req.body.precio], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }

    //COMPRAS
    public async newFactura(req: Request, res: Response) { //POST
        var connect = database.dbConnect();
        var query = `INSERT INTO FACTURA VALUES(0, :a, sysdate)`;
        await connect.exec(query, [req.body.cliente], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }

    public async getFactura(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = `SELECT id_factura, id_cliente, TO_CHAR(fecha,'DD/MM/YYYY HH24:MI:SS') "FECHA" FROM FACTURA WHERE id_cliente = :a order by id_factura desc`;
        await connect.exec(query, [req.params.id], function (result: any) {
            return res.json(result);
        });
    }

    public async newDetalleFactura(req: Request, res: Response) { //POST
        var connect = database.dbConnect();
        console.log(req.body);
        for(var i = 0; i<req.body.carrito.length; i++){
            console.log(i);
            var query = `INSERT INTO DETALLE_FACTURA VALUES(:a, :b, :c, :d)`;
            await connect.exec(query, [req.body.factura, req.body.carrito[i].ID_PRODUCTO, req.body.carrito[i].CANTIDAD
                , req.body.carrito[i].PRECIO], function (result: any) {
            });   
        }
        res.json({estado: '1'});
    }

    public async borrarCarrito(req: Request, res: Response) { //DELETE
        var connect = database.dbConnect();
        var query = `delete from carrito where id_user = :id`;
        await connect.exec(query, [req.params.id], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }



    public async sendFactura(req: Request, res: Response) { //POST
        res.json(req.body);
        console.log(req.body);

        //ENVIO DE CORREO.
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'luisangelvargasleon12@gmail.com',
                pass: 'barsa100'
            }
        });

        var items = '';

        for(var i = 0; i< req.body.carrito.length; i++){
            items = items + `<tr>
            <th>`+req.body.carrito[i].ID_PRODUCTO+`</th>
            <td>`+req.body.carrito[i].NOMBRE+`</td>
            <td>`+req.body.carrito[i].CANTIDAD+`</td>
            <td>`+req.body.carrito[i].PRECIO+`</td>
            <td>`+req.body.carrito[i].Total+`</td>
        </tr>`;
        }


        var mail_option = {
            from: 'Luis Vargas <luisangelvargasleon12@gmail.com>',
            to: req.body.user.email,
            subject: 'Factura de Compra!',
            text: 'Hola ' + req.body.user.nombre + '!',
            html: '<h1>P&S</h1>' +
                ' <h3>Hola ' + req.body.user.nombre + ', tu compra ha sido realizada con exito.</h3> ' +
                ' <ul> ' +
                ' <li>Factura: ' + req.body.factura.ID_FACTURA + '</li> ' +
                ' <li>Cliente: ' + req.body.user.nombre + ' '+req.body.user.apellido+ '</li> ' +
                ' <li>Fecha: ' + req.body.factura.FECHA + '</li> ' +
                ' </ul>' +
                '<h4>Productos: </h4> '+

                `<table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">CODIGO</th>
                        <th scope="col">PRODUCTO</th>
                        <th scope="col">CANTIDAD</th>
                        <th scope="col">PRECIO</th>
                        <th scope="col">SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody>`+
                        items +
                `</tbody>
                </table>` +
                '<h3>Total: '+ req.body.total + '</h3>'+

                '<br><br><br> '+
                ' <p>SI DESCONOCES ESTE CORREO, IGNORARLO.</p> '
        }

        transport.sendMail(mail_option, (error: any, info: any) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.json({ status: "1" });
        });
    }
    
    public async getCategoria(req: Request, res: Response) { //GET
        var connect = database.dbConnect();
        var query = "SELECT * FROM CATEGORIA";
        await connect.exec(query, [], function (result: any) {
            res.send(result);
        });
    }

    public async addCategoria(req: Request, res: Response) { //POST
        var connect = database.dbConnect();
        var query = `insert into CATEGORIA values(0, :a, :b, null)`;
        console.log(req.body);
        await connect.exec(query, [req.body.nombre, req.body.descripcion], function (result: any) {
            if (result == undefined)
                res.json({ estado: "1" });
            else
                res.json({ estado: "0" });
        });
    }



}

export const productController = new ProductController();