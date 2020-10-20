"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const database_1 = __importDefault(require("../database"));
class ProductController {
    listProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "SELECT * FROM PRODUCTO";
            yield connect.exec(query, [], function (result) {
                res.send(result);
            });
        });
    }
    listUserProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "SELECT * FROM PRODUCTO WHERE id_user = :id";
            yield connect.exec(query, [req.params.id], function (result) {
                return res.json(result);
            });
        });
    }
    listOneProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `SELECT p.ID_PRODUCTO, p.nombre, p.imagen, p.descripcion, p.id_categoria, c.nombre "categoria", p.precio, p.fecha_publicacion,
         p.cantidad, p.id_user from PRODUCTO p, CATEGORIA c where p.id_categoria = c.id_categoria and p.id_producto = :id`;
            yield connect.exec(query, [req.params.id], function (result) {
                return res.json(result);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = 'INSERT INTO PRODUCTO VALUES(0, :nombre,:imagen,:descripcion,:id_categoria,' +
                ':precio, sysdate, :cantidad, :id_user)';
            yield connect.exec(query, [req.body.nombre, req.body.imagen, req.body.descripcion, req.body.id_categoria, req.body.precio,
                req.body.cantidad, req.body.id_user], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json({ estado: "0" });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = 'DELETE FROM PRODUCTO WHERE id_producto = :id';
            var id = parseInt(req.params.id);
            yield connect.exec(query, [id], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json({ estado: "0" });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `UPDATE PRODUCTO SET
        nombre = :nombre,
        imagen = :imagen,
        descripcion = :descripcion,
        id_categoria = :id_categoria,
        precio = :precio,
        cantidad = :cantidad
        where id_producto = :id`;
            var id = parseInt(req.params.id);
            yield connect.exec(query, [req.body.nombre, req.body.imagen, req.body.descripcion, req.body.id_categoria,
                req.body.precio, req.body.cantidad, id], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json({ estado: "0" });
            });
        });
    }
    listComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "SELECT c.id_producto, c.id_user, c.titulo, c.comentario, TO_CHAR(c.fecha,'DD/MM/YYYY HH24:MI:SS') \"FECHA\", u.nombre as \"NOMBREUSER\"," +
                "c.puntuacion FROM COMENTARIO c, USUARIO u where c.id_user = u.id_user and c.id_producto = :id";
            yield connect.exec(query, [req.params.id], function (result) {
                return res.json(result);
            });
        });
    }
    newComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "INSERT INTO COMENTARIO VALUES(:id_producto, :id_user, :titulo, :comentario, sysdate, :nombreUser, :puntuacion)";
            yield connect.exec(query, [req.body.id_producto, req.body.id_user, req.body.titulo, req.body.comentario,
                req.body.nombreUser, req.body.puntuacion], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json({ estado: "0" });
            });
        });
    }
    getAVG(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "select ROUND(avg(puntuacion), 2) \"Punteo\" from comentario where id_producto = :id";
            yield connect.exec(query, [req.params.id], function (result) {
                return res.json(result);
            });
        });
    }
    getStars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "select count(*) \"Estrellas\" from comentario where id_producto = :id and puntuacion = :idp";
            yield connect.exec(query, [req.params.id, req.params.idp], function (result) {
                return res.json(result);
            });
        });
    }
    getCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `SELECT d.id_carrito, d.id_producto, p.nombre, d.cantidad, d.precio,
         (d.cantidad * d.precio) "Total" FROM DETALLE_CARRITO d, CARRITO c,
          PRODUCTO p WHERE c.id_user = :id and d.id_carrito = c.id_carrito and d.id_producto = p.id_producto`;
            yield connect.exec(query, [req.params.id], function (result) {
                return res.json(result);
            });
        });
    }
    getCarro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `select * from carrito where id_user = :a`;
            yield connect.exec(query, [req.params.id], function (result) {
                return res.json(result);
            });
        });
    }
    eliminarCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `delete from detalle_carrito where id_carrito = :idc and id_producto = :idp`;
            yield connect.exec(query, [req.params.idc, req.params.idp], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json({ estado: "0" });
            });
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `INSERT INTO DETALLE_CARRITO VALUES(:a, :b, :c, :d)`;
            yield connect.exec(query, [req.body.idc, req.body.idp, req.body.cantidad, req.body.precio], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json({ estado: "0" });
            });
        });
    }
    //COMPRAS
    newFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `INSERT INTO FACTURA VALUES(0, :a, sysdate)`;
            yield connect.exec(query, [req.body.cliente], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json({ estado: "0" });
            });
        });
    }
    getFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `SELECT id_factura, id_cliente, TO_CHAR(fecha,'DD/MM/YYYY HH24:MI:SS') "FECHA" FROM FACTURA WHERE id_cliente = :a order by id_factura desc`;
            yield connect.exec(query, [req.params.id], function (result) {
                return res.json(result);
            });
        });
    }
    newDetalleFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            console.log(req.body);
            for (var i = 0; i < req.body.carrito.length; i++) {
                console.log(i);
                var query = `INSERT INTO DETALLE_FACTURA VALUES(:a, :b, :c, :d)`;
                yield connect.exec(query, [req.body.factura, req.body.carrito[i].ID_PRODUCTO, req.body.carrito[i].CANTIDAD,
                    req.body.carrito[i].PRECIO], function (result) {
                });
            }
            res.json({ estado: '1' });
        });
    }
    borrarCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `delete from carrito where id_user = :id`;
            yield connect.exec(query, [req.params.id], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json({ estado: "0" });
            });
        });
    }
    sendFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            for (var i = 0; i < req.body.carrito.length; i++) {
                items = items + `<tr>
            <th>` + req.body.carrito[i].ID_PRODUCTO + `</th>
            <td>` + req.body.carrito[i].NOMBRE + `</td>
            <td>` + req.body.carrito[i].CANTIDAD + `</td>
            <td>` + req.body.carrito[i].PRECIO + `</td>
            <td>` + req.body.carrito[i].Total + `</td>
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
                    ' <li>Cliente: ' + req.body.user.nombre + ' ' + req.body.user.apellido + '</li> ' +
                    ' <li>Fecha: ' + req.body.factura.FECHA + '</li> ' +
                    ' </ul>' +
                    '<h4>Productos: </h4> ' +
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
                <tbody>` +
                    items +
                    `</tbody>
                </table>` +
                    '<h3>Total: ' + req.body.total + '</h3>' +
                    '<br><br><br> ' +
                    ' <p>SI DESCONOCES ESTE CORREO, IGNORARLO.</p> '
            };
            transport.sendMail(mail_option, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                res.json({ status: "1" });
            });
        });
    }
    getCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = "SELECT * FROM CATEGORIA";
            yield connect.exec(query, [], function (result) {
                res.send(result);
            });
        });
    }
    addCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var connect = database_1.default.dbConnect();
            var query = `insert into CATEGORIA values(0, :a, :b, null)`;
            console.log(req.body);
            yield connect.exec(query, [req.body.nombre, req.body.descripcion], function (result) {
                if (result == undefined)
                    res.json({ estado: "1" });
                else
                    res.json({ estado: "0" });
            });
        });
    }
}
exports.productController = new ProductController();
