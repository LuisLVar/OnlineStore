import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { ProductoService } from 'src/app/services/producto.service';

declare var $: any;

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {


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

  categoria = {nombre: '', descripcion: ''}

  categorias: any = [];


  constructor(private userService: UsersService, private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductoService) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    //console.log(params);
    this.getCategorias();
    if(params.id && params.id != undefined){
      this.userService.getUser(params.id).subscribe(
        res =>{
          console.log(res);
          const objeto: any = res;
          this.user = { id: params.id,
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
        if(this.user.fecha != null){
          this.user.fecha = objeto.FECHA.toString().substring(0,10);
        }
        },
        err => console.log(err)
      );
    }
  }


  guardarCategoria() {
    this.productService.addCategoria(this.categoria).subscribe(
      res => {
        console.log(res);
        alert('Categoria creada exitosamente!');
      },
      err => console.log(err)
    );
    this.borrarForm();
    this.getCategorias();
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
    $('#descripcion').val('');

    this.categoria = {
      nombre: '',
      descripcion: ''
    }
  }


}
