import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/Producto';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

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
    clase:''
  };

  productos: any = [];
  

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    //console.log(params);
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
        this.getUserProducts(this.user.id);
        },
        err => console.log(err)
      );
    }
  }


  getUserProducts(id: string) {
    this.productService.getUserProducts(id).subscribe(
      res => {
        this.productos = res;
        console.log(res);
      },
      err => console.error(err)
    );
  } 

  eliminarProduct(id: string) {
    this.productService.deleteProducto(id).subscribe(
      res => {      
        var r = confirm("Seguro que quieres eliminar el producto?");
        if (r == true) {
          console.log(res);
          alert('Producto Eliminado Exitosamente!');
          this.getUserProducts(this.user.id);
        } else { }
      },
      err => console.log(err)
    );
  }

}


