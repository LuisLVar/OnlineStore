import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  
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

  loggeado :boolean = true;

  conexion: any = 0;

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if(params.id && params.id != undefined){
      if(params.id != 'x'){
      this.userService.getUser(params.id).subscribe(
        res =>{
          //console.log(res);
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
        this.conexion = 1;
        //SET 1 CONECTION.
        this.userService.isOnline(this.user.id).subscribe(
          res =>  console.log(res),
          err => console.log(err)
        );
        if(this.user.fecha != null){
          this.user.fecha = objeto.FECHA.toString().substring(0,10);
        }
        this.userService.getCarrito(this.user.id).subscribe(
          res => {
            const objeto: any = res;
            console.log(res);
            if(objeto.length > 0){
              console.log('Tiene carrito');
            }else{
              console.log('No tiene carrito');
              this.userService.crearCarrito(this.user.id).subscribe(
                res => console.log(res),
                err => console.log(err)
              );
            }
          },
          err => console.log(err)
        );
        console.log(this.user)
        },
        err => console.log(err)
      );
    }else{
      this.loggeado = false;
      this.user.id = 'x';
    }
    }
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.productos = res;
        console.log(res);
        //console.log(this.users)
      },
      err => console.error(err)
    );
  }

  cerrarSesion(){
    this.userService.isOffline(this.user.id).subscribe(
      res =>  console.log(res),
      err => console.log(err)
    );
    this.router.navigate(['/inicio']);
  }
}
