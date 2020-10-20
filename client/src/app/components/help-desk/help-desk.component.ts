import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.css']
})
export class HelpDeskComponent implements OnInit {

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
    clase:''
  };

  idCliente: any = {};
  chatRoom: any = {};

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
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

        this.userService.getChatHelpDesk(this.user.id).subscribe(
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

        this.userService.isOnline(this.user.id).subscribe(
          res =>  console.log(res),
          err => console.log(err)
        );
        console.log(this.user)
        },
        err => console.log(err)
      );
    }
    //getCHAT


    //CHAT
    // this.chatService
    // .getMessages()
    // .subscribe((data) => {
    //   console.log(data);
    //   this.messages.push({msg:data.msg});
    // });
  
  }

  message: string;
  messages: any = [];

  //CHAT
  sendMessage() {
    console.log('MENSAJE: '+ this.message)
    this.userService.getChatHelpDesk(this.user.id).subscribe(
      res => {
        console.log(res);
        this.chatRoom = res[0];
        this.userService.sendMsg({chat: this.chatRoom.ID_CHAT, mensaje: this.message, emisor: this.user.id, eshd: '1'}).subscribe(      
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
    this.userService.getChatHelpDesk(this.user.id).subscribe(
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


  cerrarSesion(){
    this.userService.isOffline(this.user.id).subscribe(
      res =>  console.log(res),
      err => console.log(err)
    );
    this.router.navigate(['/inicio']);
  }
}
