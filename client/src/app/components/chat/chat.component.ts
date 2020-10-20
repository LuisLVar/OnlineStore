import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private userService: UsersService, private router: Router, private activatedRoute: ActivatedRoute, private chatService: ChatService) { }

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

  idHD: any = {};
  chatRoom: any = {};

  loggeado: boolean = true;

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    if (params.id && params.id != undefined) {
      if (params.id != 'x') {
        this.userService.getUser(params.id).subscribe(
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
            this.userService.getHD().subscribe(
              res => {
                console.log(res);
                this.idHD = res[0];
              },
              err => console.log(err)
            );
            this.userService.getChatUser(this.user.id).subscribe(
              res => {
                console.log('GET MESSAGES')
                console.log(res);
                const object:any = res;
                console.log(object);
                if(object.length > 0){
                  this.chatRoom = res[0];
                  this.getMsg();
                }
              },
              err => console.log(err)
            );
            console.log(this.user)
          },
          err => console.log(err)
        );
      } else {
        this.loggeado = false;
        this.user.id = 'x';
      }
    }
  }

  message: string;
  messages: any = [];

  //CHAT
  sendMessage() {
    console.log('MENSAJE: '+ this.message)
    this.userService.getChatUser(this.user.id).subscribe(
      res => {
        console.log(res);
        this.chatRoom = res[0];
        this.userService.sendMsg({chat: this.chatRoom.ID_CHAT, mensaje: this.message, emisor: this.user.id, eshd: ''}).subscribe(      
          res => {
          console.log(res);
          this.message = '';
          this.getMsg();
        },
        err => console.log(err)
      );
      },
      err => console.log(err)
    );
  }

  getMsg(){
    this.userService.getChatUser(this.user.id).subscribe(
      res => {
        console.log(res);
        this.chatRoom = res[0];
        this.userService.getMsg(this.chatRoom.ID_CHAT).subscribe(
          res => {
            console.log(res);
            this.messages = res;
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }

  newChat(){
    this.userService.newChat({cliente: this.user.id, helpdesk: this.idHD.ID_USER}).subscribe(
      res => {
        console.log(res);
        alert('Nuevo chat creado');
      },
      err => console.log(err)
    );
  }

  calificar(){
    var punteo1 = prompt('Punteo:');
    this.userService.getHD().subscribe(
      res => {
        console.log(res);
        this.idHD = res[0];

        this.userService.punteo({user: this.idHD.ID_USER, punteo: punteo1}).subscribe(
          res => {
            console.log(res);
            alert('Gracias por tu opinion!');
          },
          err => console.log(err)
        );
      },
      err => console.log(err)
    );
  }
}