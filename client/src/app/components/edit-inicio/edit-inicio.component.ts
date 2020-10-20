import { Component, OnInit } from '@angular/core';
import { PortadasService } from 'src/app/services/portadas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Portada } from 'src/app/models/Portada';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-inicio',
  templateUrl: './edit-inicio.component.html',
  styleUrls: ['./edit-inicio.component.css']
})
export class EditInicioComponent implements OnInit {

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

  portada: Portada = {
    nombre: '',
    slogan: '',
    imagen: '',
    mision: '',
    vision: '',
    about: '',
    video: ''
  };
  selectedFileImage: Array<File>;
  selectedFileVideo: Array<File>;

  onFileSelectedVideo(event) {
    console.log(event);
    this.selectedFileVideo = event.target.files;
    console.log(this.selectedFileVideo);
  }

  onFileSelectedImage(event) {
    console.log(event);
    this.selectedFileImage = event.target.files;
    console.log(this.selectedFileImage);
  }

  onUploadImage(id: string) {
    const fd = new FormData();
    // this.selectedFile.forEach((file) => {
    fd.append('file', this.selectedFileImage[0], 'portadaImage' + this.selectedFileImage[0].name.substr(this.selectedFileImage[0].name.length - 4, 4));
    // });

    console.log(id);
    console.log(fd);
    this.http.post(`http://192.168.1.7:3000/api/image/${id}`, fd).subscribe(
      res => console.log(res)
    );
  }

  onUploadVideo(id: string) {
    const fd = new FormData();
    // this.selectedFile.forEach((file) => {
    fd.append('file', this.selectedFileVideo[0], 'portadaVideo' + this.selectedFileVideo[0].name.substr(this.selectedFileVideo[0].name.length - 4, 4));
    // });

    console.log(id);
    console.log(fd);
    this.http.post(`http://192.168.1.7:3000/api/image/${id}`, fd).subscribe(
      res => console.log(res)
    );
  }

  constructor(private portadaService: PortadasService, private router: Router, private http: HttpClient, private usersService: UsersService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.portadaService.getPortada().subscribe(
      res => {
        console.log(res);
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

    //GET USER
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
  }

  updatePortada() {

    if (this.selectedFileVideo != undefined) {
      this.onUploadImage("0");
      this.portada.video = 'http://192.168.1.7:8081/images/portadaVideo' + this.selectedFileVideo[0].name.substr(this.selectedFileVideo[0].name.length - 4, 4);
    }

    if (this.selectedFileImage != undefined) {
      this.onUploadImage("0");
      this.portada.imagen = 'http://192.168.1.7:8081/images/portadaImage' + this.selectedFileImage[0].name.substr(this.selectedFileImage[0].name.length - 4, 4);
    }
    //console.log('Portada');
    // console.log(this.portada);
    this.portadaService.updatePortada(this.portada).subscribe(
      res => {
        //console.log(res);
        var r = confirm("Seguro que quieres modificar la portada?");
        if (r == true) {
          console.log(res);
          alert('Portada Modificado Exitosamente!');
          this.router.navigate(['/principal', this.user.id]);
        } else { }
      },
      err => console.log(err)
    );
  }

}
