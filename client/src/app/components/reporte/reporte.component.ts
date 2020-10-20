import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';

declare var $:any;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

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

  reporte1: boolean = false;
  reporte2: boolean = false;
  reporte3: boolean = false;
  reporte4: boolean = false;
  reporte5: boolean = false;
  reporte6: boolean = false;
  reporte7: boolean = false;
  reporte8: boolean = false;
  reporte9: boolean = false;
  reporte10: boolean = false;
  reporte11: boolean = false;

  x1: any = '';
  x2: any = '';
  x3: any = '';

  reporte: any = [];

  constructor(private usersService: UsersService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
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

  Reporte1() {
    this.setFalse();
    this.usersService.reporte1().subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte1 = true;
      },
      err => console.log(err)
    );
  }

  Reporte2() {
    this.setFalse();
    this.usersService.reporte2(this.x1).subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte2 = true;
      },
      err => console.log(err)
    );
  }
  Reporte3() {
    this.setFalse();
    this.usersService.reporte3(this.x2).subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte3 = true;
      },
      err => console.log(err)
    );
  }
  Reporte4() {
    this.setFalse();
    this.usersService.reporte4().subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte4 = true;
      },
      err => console.log(err)
    );
  }
  Reporte5() {
    this.setFalse();
    this.usersService.reporte5().subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte5 = true;
      },
      err => console.log(err)
    );
  }
  Reporte6() {
    this.setFalse();
    this.usersService.reporte6().subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte6 = true;
      },
      err => console.log(err)
    );
  }
  Reporte7() {
    this.setFalse();
    this.usersService.reporte7().subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte7 = true;
      },
      err => console.log(err)
    );
  }
  Reporte8() {
    this.setFalse();
    this.usersService.reporte8().subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte8 = true;
      },
      err => console.log(err)
    );
  }
  Reporte9(){
    this.setFalse();
    this.usersService.reporte9().subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte9 = true;
      },
      err => console.log(err)
    );
  }
  Reporte10(){
    this.setFalse();
    this.usersService.reporte10(this.x3).subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte10 = true;
      },
      err => console.log(err)
    );
  }
  Reporte11(){
    this.setFalse();
    this.usersService.reporte11().subscribe(
      res => {
        console.log(res);
        this.reporte = res;
        this.reporte11 = true;
      },
      err => console.log(err)
    );
  }

  setFalse(){
    this.reporte1 = false;
    this.reporte2 = false;
    this.reporte3 = false;
    this.reporte4 = false;
    this.reporte5 = false;
    this.reporte6 = false;
    this.reporte7 = false;
    this.reporte8 = false;
    this.reporte9 = false;
    this.reporte10 = false;
    this.reporte11 = false;
    $('#yearx').val('');
    $('#yeary').val('');
    $('#cantidad').val('');
  }

}
