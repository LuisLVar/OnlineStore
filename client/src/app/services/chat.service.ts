import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // private url = 'http://192.168.1.7:3000';
  // private socket;

  // constructor() {
  //   this.socket = io(this.url);
  // }

  // public sendMessage(message) {
  //   this.socket.emit('new-message', {msg: message});
  // }

  // public getMessages = () => {
  //   let observable = new Observable<{msg:string}>(
  //     observer=>{
  //       this.socket.on('new-message',(data)=>{
  //         observer.next(data);
  //         console.log('Entro');
  //       });
  //       return () => {this.socket.disconnect();}
  //     });
  //     return observable;
  //   }
}
