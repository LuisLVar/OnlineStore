import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit {

  edit: boolean = false;
  selectedFile: Array<File>;

  constructor(private userService: UsersService, private router: Router, private activatedRoute: ActivatedRoute,
     private productService: ProductoService, private http: HttpClient) { }


  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files;
    console.log(this.selectedFile);
  }

  onUpload(id: string){
    const fd = new FormData();
    // this.selectedFile.forEach((file) => {
      fd.append('file', this.selectedFile[0], 'product'+this.product.id+this.selectedFile[0].name.substr(this.selectedFile[0].name.length-4, 4));
    // });
   
    console.log(id);
    console.log(fd);
    this.http.post(`http://192.168.1.7:3000/api/image/${id}`, fd).subscribe(
      res=>console.log(res)
    );
  }


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
    clase:''
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

  categorias: any = [];

  ngOnInit() {
    this.getCategorias();
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.id && params.id != undefined) {
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
    }

    //EDITAR PRODUCTOS
    if (params.idp && params.idp != undefined) {
      // console.log('Params: ');
      //console.log(params);
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
            id_user: objeto.ID_USER,
          }
          if (this.product.fecha != null) {
            this.product.fecha = objeto.FECHA_PUBLICACION.toString().substring(0, 10);
          }
          this.edit = true; 
        },
        err => console.log(err)
      );
    }
  }

  guardarProducto() {
    this.product.id_user = this.user.id;
    console.log(this.product);
    this.productService.createProducto(this.product).subscribe(
      res => {
        console.log(res);
        alert('Producto creado exitosamente!');
        //this.router.navigate(['/users']);
      },
      err => console.log(err)
    );
    this.borrarForm();
  }

  updateProducto(){
    //console.log(this.user);
    if(this.selectedFile != undefined){
      this.onUpload(this.user.id);
      this.product.imagen = 'http://192.168.1.7:8081/images/product'+this.product.id+this.selectedFile[0].name.substr(this.selectedFile[0].name.length-4, 4);
    }
    this.productService.updateProducto(this.product.id, this.product).subscribe(
      res => {
          //console.log(res);
          var r = confirm("Seguro que quieres modificar el producto?");
          if (r == true) {
            console.log(res);
            alert('Producto Modificado Exitosamente!');
            this.router.navigate(['/producto', this.user.id]);
          } else { }
      },
      err => console.log(err)
    );
  }

  getCategorias() {
    this.productService.getCategorias().subscribe(
      res => {
        console.log(res);
        this.categorias = res;
      },
      err => console.log(err)
    );
  }

  borrarForm() {
    $('#nombre').val('');
    $('#imagen').val('');
    $('#descripcion').val('');
    $('#categoria').val('');
    $('#precio').val('');
    $('#cantidad').val('');

    this.product = {
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
  }

}
