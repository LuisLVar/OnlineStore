import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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
    estado: '0',
    credito: '',
    ganancia: '',
    clase:''
  };


  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  guardarUser(){
    this.user.fotografia = '';
    this.user.tipo_user = '3';
    this.user.estado = '2';
    console.log(this.user);
    this.userService.createUser(this.user).subscribe(
        res => {
          console.log(res);
          alert('Ingresa en el login para continuar el proceso de creacion de cuenta.');
          this.router.navigate(['/login']);
        },
        err => console.log(err)
    );
  }


}
