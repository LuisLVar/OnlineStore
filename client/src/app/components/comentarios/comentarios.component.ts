import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { User } from 'src/app/models/User';
import { Producto } from 'src/app/models/Producto';
import { Comentario } from 'src/app/models/Comentario';

declare var $: any;

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

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

  comment: Comentario = {
    id_producto: '',
    id_user: '',
    titulo: '',
    comentario: '',
    fecha: '',
    nombreUser: '',
    puntuacion: ''
  }

  comentarios: any = [];

  estrella1: number = 0;
  estrella2: number = 0;
  estrella3: number = 0;
  estrella4: number = 0;
  estrella5: number = 0;

  loggeado: boolean = true;

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.id && params.id != undefined) {
      if (params.id != 'x') {
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

    //Ver Producto individual
    if (params.idp && params.idp != undefined) {
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

          this.productService.getStars(this.product.id, '1').subscribe(
            res => {
              console.log(res);
              const objeto = res[0];
              this.estrella1 = objeto.Estrellas;
            },
            err => console.log(err)
          );

          this.productService.getStars(this.product.id, '2').subscribe(
            res => {
              console.log(res);
              const objeto = res[0];
              this.estrella2 = objeto.Estrellas;
            },
            err => console.log(err)
          );

          this.productService.getStars(this.product.id, '3').subscribe(
            res => {
              console.log(res);
              const objeto = res[0];
              this.estrella3 = objeto.Estrellas;
            },
            err => console.log(err)
          );

          this.productService.getStars(this.product.id, '4').subscribe(
            res => {
              console.log(res);
              const objeto = res[0];
              this.estrella4 = objeto.Estrellas;
            },
            err => console.log(err)
          );

          this.productService.getStars(this.product.id, '5').subscribe(
            res => {
              console.log(res);
              const objeto = res[0];
              this.estrella5 = objeto.Estrellas;
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
              this.getComentarios(this.product.id);
            },
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
    }
  }


  getComentarios(id: string) {
    this.productService.getComentarios(id).subscribe(
      res => {
        this.comentarios = res;
        console.log(res);
      },
      err => console.error(err)
    );
  }

  newComentario() {
    this.comment.id_producto = this.product.id;
    this.comment.id_user = this.user.id;
    this.comment.nombreUser = this.user.nombre;
    console.log(this.comment);
    this.productService.newComentario(this.comment).subscribe(
      res => {
        console.log(res);
        alert('Comentario creado exitosamente!');
        //this.router.navigate(['/users']);
        this.getComentarios(this.product.id);
      },
      err => console.log(err)
    );
    this.borrarForm();
  }

  borrarForm() {
    $('#comentario').val('');
    $('#titulo').val('');
    $('#puntuacion').val('');

    this.comment = {
      id_producto: '',
      id_user: '',
      titulo: '',
      comentario: '',
      fecha: '',
      nombreUser: '',
      puntuacion: ''
    }
  }

}
