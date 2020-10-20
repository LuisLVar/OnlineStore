import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URI = 'http://192.168.1.7:3000/api';
  constructor(private http: HttpClient) { }

  getLogin(user:User){
    return this.http.post(`${this.API_URI}/login`, user);
  }

  getLoginEmail(user:User){
    return this.http.post(`${this.API_URI}/login/pwd`, user);
  }

  confirmarCuenta(user:User){
    return this.http.post(`${this.API_URI}/users/registro`, user);
  }

  recuperarPWd(user:User){
    return this.http.post(`${this.API_URI}/users/recuperar`, user);
  }
}
