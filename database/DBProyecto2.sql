---------------------- USUARIO -------------------------

insert into usuario values(0, '2', 'Luis Angel', 'Vargas', 'password', 'luis2.com', '40502030',
 'path/fotografia', 'M', to_date('17/09/1998','DD/MM/YYYY'), sysdate, 'Avenida 1', 50000, 0, 'Diamante', 1,0);
 
 commit;
 
 select * from usuario;
 
select id_user "ID" from USUARIO where email = 'pedro.com';

UPDATE USUARIO SET
        estado = 0
        where nombre = 'Luis' and estado = 1;

select usuario_seq.CURRVAL "ID" from dual;

INSERT INTO CARRITO VALUES(0, 29, sysdate);

 delete from usuario where id_user = 27;

update usuario set nombre = 'Luis' where id_user = 21;

ALTER TABLE USUARIO MODIFY nombre NOT NULL;


CREATE TABLE USUARIO(
id_user NUMBER(5) NOT NULL,
tipo_user VARCHAR(2), -- 1=ADMIN, 2=HELP-DESK, 3 = CLIENTE
nombre VARCHAR2(50),
apellido VARCHAR2(50),
clave VARCHAR2(30),
email VARCHAR2(80),
telefono VARCHAR2(15),
fotografia VARCHAR2(100),
genero VARCHAR2(2),
fecha DATE,
fecha_registro TIMESTAMP,
direccion VARCHAR2(50),
credito number(10),
ganancia number(10),
clase VARCHAR(20),
estado NUMBER(1),
conexion NUMBER(1),
CONSTRAINT usuario_pk PRIMARY KEY (id_user)
);

alter table usuario add conexion NUMBER(1);


CREATE SEQUENCE usuario_seq START WITH 1;
  
CREATE OR REPLACE TRIGGER usuario_bir 
BEFORE INSERT ON USUARIO 
FOR EACH ROW

BEGIN
  SELECT usuario_seq.NEXTVAL
  INTO   :new.id_user
  FROM   dual;
END;

----------------------CATEGORIA-------------------------
insert into categoria values(0, '', '', null);
select * from categoria;

CREATE TABLE CATEGORIA(
id_categoria NUMBER(5) NOT NULL,
nombre VARCHAR2(50),
descripcion VARCHAR2(150),
id_padre NUMBER(5),
CONSTRAINT cat_padre_fk FOREIGN KEY (id_padre) REFERENCES CATEGORIA(id_categoria) ON DELETE CASCADE,
CONSTRAINT categoria_pk PRIMARY KEY (id_categoria)
);

CREATE SEQUENCE cat_seq START WITH 1;
  
CREATE OR REPLACE TRIGGER cat_bir 
BEFORE INSERT ON CATEGORIA 
FOR EACH ROW

BEGIN
  SELECT cat_seq.NEXTVAL
  INTO   :new.id_categoria
  FROM   dual;
END;

----------------------PRODUCTO-------------------------

INSERT INTO PRODUCTO VALUES(0, 'Mazda 3', 'imagen', 'carro', '', 100, sysdate, 10, 4);
SELECT * FROM PRODUCTO;
SELECT * FROM PRODUCTO WHERE id_user = 4;
commit;
rollback;

INSERT INTO PRODUCTO VALUES(0, 'Corolla', '', '', '',  '', sysdate, '', '4');

CREATE TABLE PRODUCTO(
id_producto NUMBER(5) NOT NULL,
nombre VARCHAR2(100),
imagen VARCHAR2(100),
descripcion VARCHAR2(250),
id_categoria number(5),
precio number(10),
fecha_publicacion TIMESTAMP,
cantidad number(10),
id_user NUMBER(5),
CONSTRAINT user_Prod_fk FOREIGN KEY (id_user) REFERENCES USUARIO(id_user) ON DELETE CASCADE,
CONSTRAINT cat_Prod_fk FOREIGN KEY (id_categoria) REFERENCES CATEGORIA(id_categoria) ON DELETE CASCADE,
CONSTRAINT producto_pk PRIMARY KEY (id_producto)
);

CREATE SEQUENCE prod_seq START WITH 1;
  
CREATE OR REPLACE TRIGGER prod_bir 
BEFORE INSERT ON PRODUCTO 
FOR EACH ROW

BEGIN
  SELECT prod_seq.NEXTVAL
  INTO   :new.id_producto
  FROM   dual;
END;

----------------------COLOR-------------------------


CREATE TABLE COLOR(
id_color NUMBER(5) NOT NULL,
color VARCHAR2(50),
id_producto NUMBER(5),
CONSTRAINT color_Prod_fk FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto) ON DELETE CASCADE
);

CREATE SEQUENCE color_seq START WITH 1;
  
CREATE OR REPLACE TRIGGER color_bir 
BEFORE INSERT ON COLOR 
FOR EACH ROW

BEGIN
  SELECT color_seq.NEXTVAL
  INTO   :new.id_color
  FROM   dual;
END;

----------------------DESCRIPCION --------------------
CREATE TABLE PORTADA(
nombre VARCHAR2(50),
slogan VARCHAR2(100),
imagen VARCHAR2(100),
mision VARCHAR2(200),
vision VARCHAR2(200),
about VARCHAR2(200),
video VARCHAR2(100)
);


insert into PORTADA values('AmazonBB', 'A solo un click de distancia!', 'image',
'Facilitar la compra-venta de productos en linea y extender el mercado en linea, para llevar la comodidad de comprar en linea a todas las personas.',
 'Empresa lider en el mercado en linea, con millones de usuarios comprando y vendiendo diariamente.',
 'Somos una empresa que facilita la compra-venta en linea a traves de nuestra plataforma, donde todos pueden comprar y vender.',
 'video');
 
 update portada set 
 nombre = :nombre,
 slogan  = slogan,
 imagen = :imagen,
 mision = :mision,
 vision = :vision,
 about = :about,
 video = :video where rownum = 1;

 
 

SELECT * from PORTADA;

commit;


------------- COMENTARIOS ---------------
CREATE TABLE COMENTARIO(
id_producto NUMBER(5),
id_user NUMBER(5),
titulo VARCHAR2(100),
comentario VARCHAR2(200),
fecha TIMESTAMP,
nombreUser VARCHAR2(50),
puntuacion number(2),
CONSTRAINT user_Com_fk FOREIGN KEY (id_user) REFERENCES USUARIO(id_user) ON DELETE CASCADE,
CONSTRAINT pro_Com_fk FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto) ON DELETE CASCADE
);

select * from comentario;
commit;

rollback;

delete from comentario where id_producto is null;

insert into comentario values(6, 4, 'Excelente', 'Me encanta el carro', sysdate, 'Andres', 5);


select ROUND(avg(puntuacion), 2) "Punteo" from comentario where id_producto = 6;

select count(*) "Estrellas" from comentario where puntuacion = 5 and id_producto = 6;
select count(*) from comentario where puntuacion = 4;
select count(*) from comentario where puntuacion = 3;
select count(*) from comentario where puntuacion = 2;
select count(*) from comentario where puntuacion = 1;
select count(*) from comentario;

select ROUND(avg(puntuacion), 2) "Punteo" from comentario where id_producto = 6;


create table BITACORA(
id_admin NUMBER(5),
id_user NUMBER(5),
accion VARCHAR2(50),
descripcion VARCHAR2(200),
fecha TIMESTAMP
);

select a.email "ADMIN", u.email "USER", b.accion, b.descripcion, TO_CHAR(b.fecha,'DD/MM/YYYY HH24:MI:SS') "FECHA" from bitacora b, usuario a, usuario u 
where b.id_admin = a.id_user and b.id_user = u.id_user;

commit;

CREATE OR REPLACE PROCEDURE llenarBitacora(id_a NUMBER, id_u NUMBER, accion VARCHAR2, descripcion VARCHAR2 )
IS
BEGIN
    INSERT INTO BITACORA VALUES(id_a, id_u, accion, descripcion, sysdate);
END;

EXEC llenarBitacora(1, 5, 'update', 'Cambio de imagen');

select * from usuario;

------------------------- CARRITO DE COMPRAS ---------------------

CREATE TABLE CARRITO(
id_carrito NUMBER(5),
id_user NUMBER(5),
fecha TIMESTAMP,
CONSTRAINT user_Car_fk FOREIGN KEY (id_user) REFERENCES USUARIO(id_user) ON DELETE CASCADE,
CONSTRAINT carrito_pk PRIMARY KEY (id_carrito)
);

CREATE SEQUENCE carrito_seq START WITH 1;
  
CREATE OR REPLACE TRIGGER carrito_bir 
BEFORE INSERT ON CARRITO 
FOR EACH ROW

BEGIN
  SELECT carrito_seq.NEXTVAL
  INTO   :new.id_carrito
  FROM   dual;
END;


INSERT INTO CARRITO VALUES(0, 29, sysdate);
INSERT INTO CARRITO VALUES(0, 5, sysdate);
commit;
SELECT * FROM USUARIO;
SELECT id_carrito, id_user, TO_CHAR(fecha,'DD/MM/YYYY HH24:MI:SS') "FECHA" FROM CARRITO;
select * from carrito where id_user = 29;
select * from carrito;

delete from carrito where id_user = 29;
delete from carrito;

---------- DETALLE CARRITO ----------------
CREATE TABLE DETALLE_CARRITO(
id_carrito NUMBER(5),
id_producto NUMBER(5),
cantidad NUMBER(5),
precio NUMBER(10),
CONSTRAINT det_Car_fk FOREIGN KEY (id_carrito) REFERENCES CARRITO(id_carrito) ON DELETE CASCADE,
CONSTRAINT pro_Car_fk FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto) ON DELETE CASCADE,
CONSTRAINT detailCar_pk PRIMARY KEY (id_carrito, id_producto)
);

-- id_carrito, id_producto ,cantidad, precio.
INSERT INTO DETALLE_CARRITO VALUES(9, 5, 2, 200);
INSERT INTO DETALLE_CARRITO VALUES(9, 6, 2, 200);

--OBTENER CARRITO SEGUN EL ID DE USUARIO
SELECT d.id_carrito, d.id_producto, p.nombre, d.cantidad, d.precio, (d.cantidad * d.precio) "Total" FROM DETALLE_CARRITO d, CARRITO c, PRODUCTO p WHERE c.id_user = 29 and d.id_carrito = c.id_carrito and d.id_producto = p.id_producto;

delete from detalle_carrito where id_carrito = 9 and id_producto =5;

rollback;

SELECT * FROM DETALLE_CARRITO;
commit;
select * from PRODUCTO;

----------------- FACTURA --------------------
CREATE TABLE FACTURA(
id_factura NUMBER(5),
id_cliente NUMBER(5),
fecha TIMESTAMP,
CONSTRAINT cliente_fact_fk FOREIGN KEY (id_cliente) REFERENCES USUARIO(id_user) ON DELETE CASCADE,
CONSTRAINT factura_pk PRIMARY KEY (id_factura)
);


CREATE SEQUENCE factura_seq START WITH 1;
  
CREATE OR REPLACE TRIGGER factura_bir 
BEFORE INSERT ON FACTURA 
FOR EACH ROW

BEGIN
  SELECT factura_seq.NEXTVAL
  INTO   :new.id_factura
  FROM   dual;
END;


------DETALLE FACTURA --------------
CREATE TABLE DETALLE_FACTURA(
id_factura NUMBER(5),
id_producto NUMBER(5),
cantidad NUMBER(5),
precio NUMBER(10),
CONSTRAINT det_fact_fk FOREIGN KEY (id_factura) REFERENCES FACTURA(id_factura) ON DELETE CASCADE,
CONSTRAINT pro_fact_fk FOREIGN KEY (id_producto) REFERENCES PRODUCTO(id_producto) ON DELETE CASCADE,
CONSTRAINT detailFact_pk PRIMARY KEY (id_factura, id_producto)
);
 
--CREAR FACTURA.
INSERT INTO FACTURA VALUES(0, 29, sysdate);

-- GET ID DE LA FACTURA
SELECT id_factura, id_cliente, TO_CHAR(fecha,'DD/MM/YYYY HH24:MI:SS') "FECHA" FROM FACTURA WHERE id_cliente = 29 order by id_factura desc;

SELECT * FROM FACTURA;

select * from detalle_factura;

-- INSERTAR DETALLE
INSERT INTO DETALLE_FACTURA VALUES(28, 2, 2, 100);

delete from detalle_factura where id_factura = 28;

delete from factura;

commit;

--OBTENER CARRITO SEGUN EL ID DE USUARIO
SELECT d.id_carrito, d.id_producto, p.nombre, d.cantidad, d.precio, (d.cantidad * d.precio) "Total" FROM DETALLE_CARRITO d, CARRITO c, PRODUCTO p WHERE c.id_user = 29 and d.id_carrito = c.id_carrito and d.id_producto = p.id_producto;


-------------- TRIGGER DE DISMINUCION DE CANTIDAD, DISMINUCION DE CREDITO E INCREMENTO DE GANANCIA -----------------
create or replace trigger actualizarCantidad after insert on DETALLE_FACTURA for each row
begin
UPDATE PRODUCTO P set P.cantidad = (P.cantidad - :new.cantidad) where :new.id_producto = P.id_producto;
UPDATE USUARIO U set U.credito = (U.credito - (:new.cantidad * :new.precio)) where U.id_user = (SELECT id_cliente from FACTURA where :new.id_factura = factura.id_factura);
UPDATE USUARIO U set U.ganancia = (U.ganancia + (:new.cantidad * :new.precio)) where U.id_user =  (SELECT id_user from PRODUCTO where :new.id_producto = id_producto);
end;



SELECT * from FACTURA where id_cliente = 29;
SELECT id_producto from PRODUCTO where id_producto= 2;

select * from usuario where id_user = 29;
select * from producto where id_producto = 2;
select * from usuario;


select * from producto;
update producto set cantidad = 50;
commit;

select * from categoria;
commit;

insert into CATEGORIA values(0, 'Nombre', 'Descripcion', null);

delete from categoria where id_categoria !=1;

SELECT * FROM PRODUCTO;



SELECT p.ID_PRODUCTO, p.nombre, p.imagen, p.descripcion, c.nombre "categoria", p.precio, p.fecha_publicacion, p.cantidad, p.id_user from PRODUCTO p, CATEGORIA c where p.id_categoria = c.id_categoria and p.id_producto = 6;


SELECT p.ID_PRODUCTO, p.nombre, p.imagen, p.descripcion, p.id_categoria, c.nombre "categoria", p.precio, p.fecha_publicacion,
         p.cantidad, p.id_user from PRODUCTO p, CATEGORIA c where p.id_categoria = c.id_categoria and p.id_producto = 6;
         
commit;
update producto set id_categoria = 1;


------------------- PUNTUACION USER ------------
CREATE TABLE PUNTEO(
id_user NUMBER(5),
punteo NUMBER(5),
CONSTRAINT user_pun_fk FOREIGN KEY (id_user) REFERENCES USUARIO(id_user) ON DELETE CASCADE
);

insert into punteo values(3, 5);
insert into punteo values(3, 5);
insert into punteo values(3, 4);
insert into punteo values(33, 2);
insert into punteo values(34, 3);
commit;
SELECT *FROM USUARIO WHERE tipo_user = 2;
select * from punteo;
select * from usuario;
-------------------  REPORTES -------------------
-- REPORTE 1--
select u.id_user, u.nombre, u.apellido, u.email, ROUND(avg(p.punteo),2) as total from USUARIO u, PUNTEO p where u.id_user = p.id_user  GROUP BY u.id_user, u.nombre, u.apellido, u.email order by total desc;

-- REPORTE 2--
select id_user, nombre, apellido, email, to_char(fecha, 'DD/MM/YYYY') as Fecha from USUARIO where genero = 'M' and to_number(to_char(fecha, 'YYYY')) > 1997;

-- REPORTE 3 --
select id_user, nombre, apellido, email, to_char(fecha, 'DD/MM/YYYY') as Fecha from USUARIO where genero = 'F' and to_number(to_char(fecha, 'YYYY')) < 1997;

-- REPORTE 4--
select id_user, nombre, apellido, email, ganancia  from USUARIO where ganancia > 0 order by ganancia desc;

-- REPORTE 5 --
SELECT P.id_producto, P.nombre, ROUND(avg(c.puntuacion), 2) as punteo FROM comentario c, producto p where c.id_producto = p.id_producto GROUP BY p.id_producto, p.nombre order by punteo desc;

-- REPORTE 6 --
select * from ( SELECT d.id_producto, p.nombre, sum(d.cantidad) as vendido FROM DETALLE_FACTURA d, PRODUCTO p where d.id_producto = p.id_producto GROUP BY d.id_producto, p.nombre order by vendido desc) where rownum <=3;

-- REPORTE 7 --
select pr.id_user, p.nombre, p.apellido, p.email, count(*) as Productos  from USUARIO p, PRODUCTO pr where p.id_user = pr.id_user group by pr.id_user, p.nombre, p.apellido, p.email order by productos desc;


-- REPORTE 8 --
SELECT p.id_producto, p.nombre, p.precio, c.nombre as categoria FROM PRODUCTO p, CATEGORIA c where p.id_categoria = c.id_categoria;

-- REPORTE 9 --
SELECT c.id_producto, p.nombre, p.precio, count(*) as comentarios FROM PRODUCTO p, COMENTARIO c where p.id_producto = c.id_producto GROUP BY c.id_producto, p.nombre, p.precio ORDER BY comentarios desc;

-- REPORTE 10--
SELECT p.id_producto, p.nombre, p.precio, p.cantidad FROM PRODUCTO p where p.cantidad = 50;


-- REPORTE 11 --
SELECT * FROM (SELECT P.id_producto, P.nombre, ROUND(avg(c.puntuacion), 2) as punteo FROM comentario c, producto p where c.id_producto = p.id_producto GROUP BY p.id_producto, p.nombre order by punteo asc) WHERE rownum <= 3;


---------- CHAT ------------
CREATE TABLE CHAT(
id_chat NUMBER(5) NOT NULL,
id_user NUMBER(5),
id_helpdesk NUMBER(5),
estado NUMBER(1),
CONSTRAINT us_chat_fk FOREIGN KEY (id_user) REFERENCES USUARIO(id_user) ON DELETE CASCADE,
CONSTRAINT hd_chat_fk FOREIGN KEY (id_helpdesk) REFERENCES USUARIO(id_user) ON DELETE CASCADE,
CONSTRAINT chat_pk PRIMARY KEY (id_chat)
);
 
CREATE SEQUENCE chat_seq START WITH 1;
  
CREATE OR REPLACE TRIGGER chat_bir 
BEFORE INSERT ON CHAT 
FOR EACH ROW

BEGIN
  SELECT chat_seq.NEXTVAL
  INTO   :new.id_chat
  FROM   dual;
END;

---- MENSAJES ----
CREATE TABLE MENSAJE(
id_chat NUMBER(5),
id_emisor NUMBER(5),
mensaje VARCHAR(100),
fecha TIMESTAMP,
esHD number(1),
CONSTRAINT us_msg_fk FOREIGN KEY (id_emisor) REFERENCES USUARIO(id_user) ON DELETE CASCADE,
CONSTRAINT chat_msg_fk FOREIGN KEY (id_chat) REFERENCES CHAT(id_chat) ON DELETE CASCADE
);
 

--CONEXION A 1
UPDATE USUARIO SET conexion = 1 where id_user = 33; --LOGIN
UPDATE USUARIO SET conexion = 0; --LOGOUT

select id_user, conexion, tipo_user from USUARIO;

select id_chat, id_emisor, mensaje, TO_CHAR(fecha,'DD/MM/YYYY HH24:MI:SS') as fecha, esHD from mensaje where id_chat = 2 order by fecha;--GET ALL MENSAJES

SELECT id_user  from USUARIO where conexion = 1 and tipo_user = '2';
SELECT id_user  from USUARIO where conexion = 1;

select * from chat;
select * from mensaje where id_chat = 2;

commit;

-- MANEJO DEL CHAT -- 
insert into chat values(0, 29, 3, 1); -- CREAR CHAT

insert into mensaje values(1, 29, 'Hola', sysdate, ''); --mensaje del cliente
insert into mensaje values(1, 3, sysdate, 1); --mensaje del help desk
 -- PARA EL HELPDESK
select c.id_chat, c.id_user, u.nombre, c.id_helpdesk, c.estado from CHAT c, USUARIO u where id_helpdesk= 3 and c.id_user = u.id_user;

select c.id_chat, c.id_user, u.nombre, c.id_helpdesk, c.estado from CHAT c, USUARIO u where c.id_user= 29 and c.id_helpdesk = u.id_user;


select * from usuario;

delete from mensaje;




