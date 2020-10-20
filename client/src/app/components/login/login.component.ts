import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PortadasService } from 'src/app/services/portadas.service';
import { Portada } from 'src/app/models/Portada';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {

  constructor(private renderer: Renderer2, private loginService: LoginService, private router: Router,
    private activatedRoute: ActivatedRoute, private portadaService: PortadasService) {
    this.renderer.addClass(document.body, 'bg-primary');
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
    estado: '0',
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

  ngOnInit() {
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

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg-primary');
  }

  iniciarSesion() {
    console.log(this.user);
    this.loginService.getLogin(this.user).subscribe(
      res => {
        console.log(res);
        const objeto: any = res[0];
        console.log(objeto);
        if (objeto != undefined) {
          if (objeto.ESTADO == '1') {
            if (objeto.TIPO_USER == "1") {
              alert('Bienvenido ' + objeto.NOMBRE + '!');
              this.router.navigate(['/users', objeto.ID_USER]);
            } else if (objeto.TIPO_USER == "2") {
              alert('Bienvenido ' + objeto.NOMBRE + '!');
              this.router.navigate(['/helpdesk', objeto.ID_USER]);
            }
            else if (objeto.TIPO_USER == "3") {
              alert('Bienvenido ' + objeto.NOMBRE + '!');
              this.router.navigate(['/cliente', objeto.ID_USER]);
            } else {
              alert('Usuario incorrecto.');
            }
          } else if (objeto.ESTADO == '2') {
            alert('Cuenta sin confirmar, se te ha enviado un correo para confirmar tu cuenta.');
            this.user = {
              id: objeto.ID_USER,
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
            this.loginService.confirmarCuenta(this.user).subscribe(
              res => console.log(res),
              err => console.log(err)
            );
          }
          else {
            alert('Cuenta congelada o sin confirmar.');
          }
        } else {
          alert('Usuario o password incorrecto.');
        }
      },
      err => console.log(err)
    );
    this.borrarForm();
  }


  recuperarPwd() {

    console.log(this.user);
    this.loginService.getLoginEmail(this.user).subscribe(
      res => {
        console.log(res);
        const objeto: any = res[0];
        this.user = {
          id: objeto.ID_USER,
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
        this.user.clave =  Math.random().toString(36).slice(-8);
        this.loginService.recuperarPWd(this.user).subscribe(
          res => console.log(res),
          err => console.log(err)
        );
        alert('Se enviara un mail a tu correo con la password provisional.');
        this.borrarForm();
      },
      err => console.log(err)
    );
    this.borrarForm();
  }

  borrarForm() {
    $('#pass').val('');
    $('#email').val('');
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
