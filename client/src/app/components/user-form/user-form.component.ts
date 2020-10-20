import { Component, OnInit, HostBinding } from '@angular/core';
import { User } from 'src/app/models/User';

import {UsersService} from '../../services/users.service'
import {Router, ActivatedRoute} from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { Bitacora } from 'src/app/models/Bitacora';

declare var $: any;

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  //@HostBinding('class') classes = 'row';

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

  bitacora: Bitacora = {
    admin: '',
    user: '',
    accion: '',
    descripcion: '',
    fecha: ''
}


  admin: User = {
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

  edit: boolean = false;
  selectedFile: Array<File>;

  constructor(private userService: UsersService, private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) { }
  
  onFileSelected(event){
    console.log(event);
    this.selectedFile = event.target.files;
    console.log(this.selectedFile);
  }

  onUpload(id: string){
    const fd = new FormData();
    // this.selectedFile.forEach((file) => {
      fd.append('file', this.selectedFile[0], 'profile'+this.user.id+this.selectedFile[0].name.substr(this.selectedFile[0].name.length-4, 4));
    // });
   
    console.log(id);
    console.log(fd);
    this.http.post(`http://192.168.1.7:3000/api/image/${id}`, fd).subscribe(
      res=>console.log(res)
    );
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if(params.ide){
      this.userService.getUser(params.ide).subscribe(
        res =>{
          console.log(res);
          const objeto: any = res;
          this.user = { id: params.ide,
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
        this.edit = true;     
          //alert('Usuario modificado exitosamente!');
        },
        err => console.log(err)
      );
    }
    if(params.id){
      this.userService.getUser(params.id).subscribe(
        res =>{
          console.log(res);
          const objeto: any = res;
          this.admin = { id: params.id,
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
        if(this.admin.fecha != null){
          this.admin.fecha = objeto.FECHA.toString().substring(0,10);
        }   
        },
        err => console.log(err)
      );
    }
  }

  updateUser(){
    //console.log(this.user);
    if(this.selectedFile != undefined){
      this.onUpload(this.user.id);
      this.user.fotografia = 'http://192.168.1.7:8081/images/profile'+this.user.id+this.selectedFile[0].name.substr(this.selectedFile[0].name.length-4, 4);
    }
    this.userService.updateUser(this.user.id, this.user).subscribe(
      res => {
          //console.log(res);
          var r = confirm("Seguro que quieres modificar el usuario?");
          if (r == true) {
            console.log(res);
            this.bitacora = {
              admin: this.admin.id,
              user: this.user.id,
              accion: 'Update',
              descripcion: '',
              fecha: ''
            }
            this.bitacora.descripcion =  prompt("Descripcion de accion: ");
            this.userService.newBitacora(this.bitacora).subscribe(
              res => console.log(res),
              err => console.log(err)
            );
            alert('Cliente Modificado Exitosamente!');
            this.router.navigate(['/users', this.admin.id]);
          } else { }
      },
      err => console.log(err)
    );
  }

  guardarUser(){
    this.user.fotografia = '';
    this.user.estado = '1';
    console.log(this.user);
    this.userService.createUser(this.user).subscribe(
        res => {
          console.log(res);
          alert('Usuario creado exitosamente!');
          //this.router.navigate(['/users']);
        },
        err => console.log(err)
    );
    this.borrarForm();
  }

  borrarForm(){
    $('#nombre').val('');
    $('#apellido').val('');
    $('#clave').val('');
    $('#email').val('');
    $('#telefono').val('');
    $('#fotografia').val('');
    $('#genero').val('');
    $('#fecha').val('');
    $('#direccion').val('');

    this.user = {
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
    }
  }
}
