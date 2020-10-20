import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var $: any;

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {


  constructor(private userService: UsersService, private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductoService) { }

  user: User = {
    id: '',
    tipo_user: '',
    nombre: '',
    apellido: '',
    clave: '',
    email: '',
    telefono: '',
    fotografia: '',
    genero: '',
    fecha: '',
    direccion: '',
    estado: '',
    credito: '',
    ganancia: '',
    clase: ''
  };

  vendedor: User = {
    id: '',
    tipo_user: '',
    nombre: '',
    apellido: '',
    clave: '',
    email: '',
    telefono: '',
    fotografia: '',
    genero: '',
    fecha: '',
    direccion: '',
    estado: '',
    credito: '',
    ganancia: '',
    clase: ''
  };


  product: Producto = {
    id: '',
    nombre: '',
    imagen: '',
    descripcion: '',
    id_categoria: '',
    categoria: '',
    precio: '',
    fecha: '',
    cantidad: '',
    id_user: '',
  }

  compra: Producto = {
    id: '',
    nombre: '',
    imagen: '',
    descripcion: '',
    id_categoria: '',
    categoria: '',
    precio: '',
    fecha: '',
    cantidad: '',
    id_user: '',
  }

  esProducto: boolean = false;

  carrito: any[];

  carro: any;

  promedio: number = 0;

  newCantidad: string;

  factura: any;

  total: number = 0;

  loggeado :boolean = true;

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.id && params.id != undefined) {
      if(params.id != 'x'){
        this.userService.getUser(params.id).subscribe(
          res => {
            console.log(res);
            const objeto: any = res;
            this.user = {
              id: params.id,
              tipo_user: objeto.TIPO_USER,
              nombre: objeto.NOMBRE,
              apellido: objeto.APELLIDO,
              clave: objeto.CLAVE,
              email: objeto.EMAIL,
              telefono: objeto.TELEFONO,
              fotografia: objeto.FOTOGRAFIA,
              genero: objeto.GENERO,
              fecha: objeto.FECHA,
              direccion: objeto.DIRECCION,
              estado: objeto.ESTADO,
              credito: objeto.CREDITO,
              ganancia: objeto.GANANCIA,
              clase: objeto.CLASE
            };
            if (this.user.fecha != null) {
              this.user.fecha = objeto.FECHA.toString().substring(0, 10);
            }
          },
          err => console.log(err)
        );
      }else{
        this.loggeado = false;
        this.user.id = 'x';
      }
    }

    if(params.id != 'x'){
    this.productService.getCarrito(params.id).subscribe(
      res => {
        console.log('CARRITO');
        const objeto: any = res;
        this.carrito = objeto;
        console.log(this.carrito);


        for(var i = 0; i< this.carrito.length; i++){
          this.total = this.total + this.carrito[i].Total;
        }

      },
      err => console.log(err)
    );

    this.productService.getCarro(params.id).subscribe(
      res => {
        console.log('CARRO');
        const objeto: any = res;
        this.carro = objeto[0];
        console.log(this.carro);
      },
      err => console.log(err)
    );
    }

    //Ver Producto individual
    if (params.idp && params.idp != undefined) {
      this.esProducto = true;
      // console.log('Params: ');
      // console.log(params);
      this.productService.getProducto(params.idp).subscribe(
        res => {
          console.log(res);
          const objeto: any = res[0];
          this.product = {
            id: objeto.ID_PRODUCTO,
            nombre: objeto.NOMBRE,
            imagen: objeto.IMAGEN,
            descripcion: objeto.DESCRIPCION,
            id_categoria: objeto.ID_CATEGORIA,
            categoria: objeto.categoria,
            precio: objeto.PRECIO,
            fecha: objeto.FECHA_PUBLICACION,
            cantidad: objeto.CANTIDAD,
            id_user: objeto.ID_USER
          }
          if (this.product.fecha != null) {
            this.product.fecha = objeto.FECHA_PUBLICACION.toString().substring(0, 10);
          }

          this.productService.getAVG(this.product.id).subscribe(
            res => {
              console.log('AVG:');
              // console.log(this.product.id);
              console.log(res);
              const objeto: any = res[0];
              this.promedio = objeto.Punteo;
            },
            err => console.log(err)
          );

          this.userService.getUser(this.product.id_user).subscribe(
            res => {
              console.log(res);
              const objeto: any = res;
              this.vendedor = {
                id: params.id,
                tipo_user: objeto.TIPO_USER,
                nombre: objeto.NOMBRE,
                apellido: objeto.APELLIDO,
                clave: objeto.CLAVE,
                email: objeto.EMAIL,
                telefono: objeto.TELEFONO,
                fotografia: objeto.FOTOGRAFIA,
                genero: objeto.GENERO,
                fecha: objeto.FECHA,
                direccion: objeto.DIRECCION,
                estado: objeto.ESTADO,
                credito: objeto.CREDITO,
                ganancia: objeto.GANANCIA,
                clase: objeto.CLASE
              };
              if (this.vendedor.fecha != null) {
                this.vendedor.fecha = objeto.FECHA.toString().substring(0, 10);
              }
            },
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
    }
  }

  eliminarCarrito(idc: string, idp: string) {
    alert('Producto eliminado');
    console.log('Producto eliminado, ' + idp + ' Carrito: ' + idc);
    this.productService.eliminarCarrito(idc, idp).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
    this.productService.getCarrito(this.user.id).subscribe(
      res => {
        const objeto: any = res;
        this.carrito = objeto;
        console.log(this.carrito);
      },
      err => console.log(err)
    );


    this.productService.getCarro(this.user.id).subscribe(
      res => {
        const objeto: any = res;
        this.carro = objeto[0];
      },
      err => console.log(err)
    );
  }

  addProduct() {
    console.log(this.newCantidad);
    const object: any = { idc: this.carro.ID_CARRITO, idp: this.product.id, cantidad: this.newCantidad, precio: this.product.precio }
    this.productService.addProduct(object).subscribe(
      res => { console.log(res) },
      err => console.log(err)
    );

    this.productService.getCarrito(this.user.id).subscribe(
      res => {
        const objeto: any = res;
        this.carrito = objeto;
      },
      err => console.log(err)
    );
    this.newCantidad = '';
  }

  comprarCarrito() {
    alert('Compra realizada con exito.');

    //CREAMOS LA FACTURA.
    const factura: any = { cliente: this.user.id }

    this.productService.newFactura(factura).subscribe(
      res => {
        console.log(res)
        //OBTENEMOS ID DE LA FACTURA
        this.productService.getFactura(this.user.id).subscribe(
          res => {
            const objeto: any = res;
            this.factura = objeto[0];
            console.log('FACTURA');
            console.log(this.factura);

            const detalle: any = {
              factura: this.factura.ID_FACTURA, carrito: this.carrito
            }

            //ADD DETAIL TO FACTURA.
            this.productService.newDetalleFactura(detalle).subscribe(
              res => {
                console.log(res)

                //Enviamos la factura. 
                this.productService.sendFactura({ carrito: this.carrito, factura: this.factura, user: this.user, total: this.total }).subscribe(
                  res => {
                    console.log(res)
                    //RESETEAMOS EL CARRITO.
                    this.productService.borrarCarrito(this.user.id).subscribe(
                      res => {
                        console.log(res)
                      },
                      err => console.log(err)
                    );

                    this.carrito = [];
                    this.carro = {};

                  },
                  err => console.log(err)

                );
              },
              err => console.log(err)
            );
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }
}

