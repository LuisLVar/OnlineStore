import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { User } from '../models/User'
import { Bitacora } from '../models/Bitacora';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://192.168.1.7:3000/api';
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.API_URI}/users`);
  }

  getUser(id: string){
    return this.http.get(`${this.API_URI}/users/${id}`);
  }

  createUser(user: User){
    return this.http.post(`${this.API_URI}/users`, user);
  }

  deleteUser(id: string){
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }

  updateUser(id: string, user: User){
    return this.http.put(`${this.API_URI}/users/${id}`, user);
  }

  getBitacora(){
    return this.http.get(`${this.API_URI}/users/bitacora`);
  }

  newBitacora(bitacora: Bitacora){
    return this.http.post(`${this.API_URI}/users/bitacora`, bitacora);
  }

  getCarrito(id: string){
    return this.http.get(`${this.API_URI}/users/carrito/${id}`);
  }

  crearCarrito(id: string){
    return this.http.post(`${this.API_URI}/users/carrito`, {id: id});
  }

  reporte1(){
    return this.http.get(`${this.API_URI}/users/rep/1`);
  }

  reporte2(id: string){
    return this.http.get(`${this.API_URI}/users/rep/2/${id}`);
  }

  reporte3(id: string){
    return this.http.get(`${this.API_URI}/users/rep/3/${id}`);
  }

  reporte4(){
    return this.http.get(`${this.API_URI}/users/rep/4`);
  }

  reporte5(){
    return this.http.get(`${this.API_URI}/users/rep/5`);
  }


  reporte6(){
    return this.http.get(`${this.API_URI}/users/rep/6`);
  }

  reporte7(){
    return this.http.get(`${this.API_URI}/users/rep/7`);
  }

  reporte8(){
    return this.http.get(`${this.API_URI}/users/rep/8`);
  }

  reporte9(){
    return this.http.get(`${this.API_URI}/users/rep/9`);
  }

  reporte10(id: string){
    return this.http.get(`${this.API_URI}/users/rep/10/${id}`);
  }

  reporte11(){
    return this.http.get(`${this.API_URI}/users/rep/11`);
  }

  isOnline(id: string){
    return this.http.get(`${this.API_URI}/users/online/${id}`);
  }

  isOffline(id: string){
    return this.http.get(`${this.API_URI}/users/offline/${id}`);
  }


  getChatHelpDesk(id: string){
    return this.http.get(`${this.API_URI}/users/chathp/${id}`);
  }

  getChatUser(id: string){
    return this.http.get(`${this.API_URI}/users/chatuser/${id}`);
  }

  
  sendMsg(data: any){
    return this.http.post(`${this.API_URI}/users/msg/new`, data);
  }

  newChat(data: any){
    return this.http.post(`${this.API_URI}/users/chat/new`, data);
  }

  getHD(){
    return this.http.get(`${this.API_URI}/users/gethd/hd`);
  }

  getMsg(id: string){
    return this.http.get(`${this.API_URI}/users/chat/get/${id}`);
  }

  punteo(data:any){
    return this.http.post(`${this.API_URI}/users/chat/punteo`, data);
  }

}
