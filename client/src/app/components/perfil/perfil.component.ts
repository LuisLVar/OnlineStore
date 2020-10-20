import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

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

  isClient: boolean = false;
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
    if(params.id != undefined){
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
        if(this.user.tipo_user == '3'){
          this.isClient = true;
        }
        console.log(this.user)
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
    console.log(this.user);
    this.userService.updateUser(this.user.id, this.user).subscribe(
      res => {
          //console.log(res);
          var r = confirm("Seguro que quieres modificar el usuario?");
          if (r == true) {
            console.log(res);
            alert('Usuario Modificado Exitosamente!');
            //window.location.reload();
            if(this.user.tipo_user == "1"){
              this.router.navigate(['/users', this.user.id]);
            }
            else if(this.user.tipo_user == "2"){
              this.router.navigate(['/helpdesk', this.user.id]);
            }
            else if(this.user.tipo_user == "3"){
              this.router.navigate(['/cliente', this.user.id]);
            }
          } else { }
      },
      err => console.log(err)
    );
  }

  inicio(){
    if(this.user.tipo_user == "1"){
      this.router.navigate(['/users', this.user.id]);
    }
    else if(this.user.tipo_user == "2"){
      this.router.navigate(['/helpdesk', this.user.id]);
    }
    else if(this.user.tipo_user == "3"){
      this.router.navigate(['/cliente', this.user.id]);
    }
    
  }
}
