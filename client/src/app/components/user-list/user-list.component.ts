import { Component, OnInit, HostBinding } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { UsersService } from '../../services/users.service'
import { User } from '../../models/User'
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PortadasService } from 'src/app/services/portadas.service';
import { Portada } from 'src/app/models/Portada';
import { Bitacora } from 'src/app/models/Bitacora';


@Pipe({
  name: 'safeHtml'
})

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, PipeTransform {

  users: any = [];
  tipoUser: string;

  bitacora: Bitacora = {
    admin: '',
    user: '',
    accion: '',
    descripcion: '',
    fecha: ''
  }

  constructor(private portadaService: PortadasService, private usersService: UsersService, private sanitizer: DomSanitizer, private router: Router, private activatedRoute: ActivatedRoute) { }


  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  portada: Portada = {
    nombre: '',
    slogan: '',
    imagen: '',
    mision: '',
    vision: '',
    about: '',
    video: ''
  };

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

  ngOnInit() {
    this.getUsers();
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.id && params.id != undefined) {
      this.usersService.getUser(params.id).subscribe(
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
          console.log(this.user)
        },
        err => console.log(err)
      );
    }

    this.portadaService.getPortada().subscribe(
      res => {
        console.log(res);
        console.log('Si toma el dato');
        const objeto: any = res[0];
        this.portada = {
          nombre: objeto.NOMBRE,
          slogan: objeto.SLOGAN,
          imagen: objeto.IMAGEN,
          mision: objeto.MISION,
          vision: objeto.VISION,
          about: objeto.ABOUT,
          video: objeto.VIDEO
        }
        console.log(this.portada);
      },
      err => console.log(err)
    );

  }

  getUsers() {
    this.usersService.getUsers().subscribe(
      res => {
        this.users = res;
        console.log(res);
        //console.log(this.users)
      },
      err => console.error(err)
    );
  }

  eliminarUser(id: string) {
    console.log(id);
    this.usersService.deleteUser(id).subscribe(
      res => {
        var r = confirm("Seguro que quieres eliminar el usuario?");
        if (r == true) {
          console.log(res);
          this.bitacora = {
            admin: this.user.id,
            user: id,
            accion: 'Delete',
            descripcion: '',
            fecha: ''
          }
          this.bitacora.descripcion = prompt("Descripcion de accion: ");
          this.usersService.newBitacora(this.bitacora).subscribe(
            res => console.log(res),
            err => console.log(err)
          );
          alert('Cliente Eliminado Exitosamente!');

          this.getUsers();
        } else { }
      },
      err => console.log(err)
    );
  }



}
