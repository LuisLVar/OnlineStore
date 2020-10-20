import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Portada } from '../models/Portada';

@Injectable({
  providedIn: 'root'
})
export class PortadasService {

  API_URI = 'http://192.168.1.7:3000/api';
  constructor(private http: HttpClient) { }

  getPortada(){
    return this.http.get(`${this.API_URI}/portada`);
  }

  updatePortada(portada: Portada){
    return this.http.put(`${this.API_URI}/portada`, portada);
  }
}
