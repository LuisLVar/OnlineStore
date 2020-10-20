import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/Producto';
import { Comentario } from '../models/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  API_URI = 'http://192.168.1.7:3000/api';
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.API_URI}/products`);
  }

  getUserProducts(id: string) {
    //console.log(id);
    return this.http.get(`${this.API_URI}/products/${id}`);
  }

  getProducto(id: string) {
    //console.log(id);
    return this.http.get(`${this.API_URI}/products/one/${id}`);
  }

  createProducto(producto: Producto) {
    return this.http.post(`${this.API_URI}/products/`, producto);
  }

  deleteProducto(id: string) {
    return this.http.delete(`${this.API_URI}/products/${id}`);
  }

  updateProducto(id: string, producto: Producto) {
    return this.http.put(`${this.API_URI}/products/${id}`, producto);
  }

  getComentarios(id: string) {
    return this.http.get(`${this.API_URI}/products/comments/${id}`);
  }

  newComentario(comentario: Comentario) {
    return this.http.post(`${this.API_URI}/products/comments`, comentario);
  }

  getAVG(id: string) {
    console.log('ID:');
    console.log(id);
    return this.http.get(`${this.API_URI}/products/comments/avg/${id}`);
  }

  getStars(id: string, idp: string) {
    return this.http.get(`${this.API_URI}/products/comments/count/${id}/${idp}`);
  }

  getCarrito(id: string) {
    return this.http.get(`${this.API_URI}/products/carrito/${id}`);
  }

  getCarro(id: string) {
    return this.http.get(`${this.API_URI}/products/carro/${id}`);
  }

  eliminarCarrito(idc: string, idp: string) {
    return this.http.get(`${this.API_URI}/products/carrito/${idc}/${idp}`);
  }

  addProduct(data: any) {
    return this.http.post(`${this.API_URI}/products/carrito/add`, data);
  }

  //COMPRAR
  newFactura(data: any) {
    return this.http.post(`${this.API_URI}/products/factura`, data);
  }

  getFactura(id: string) {
    return this.http.get(`${this.API_URI}/products/factura/${id}`);
  }

  newDetalleFactura(data: any) {
    return this.http.post(`${this.API_URI}/products/detalle`, data);
  }

  borrarCarrito(id: string) {
    return this.http.delete(`${this.API_URI}/products/borrarcarrito/${id}`);
  }

  sendFactura(data: any) {
    return this.http.post(`${this.API_URI}/products/sendbill`, data);
  }

  getCategorias() {
    return this.http.get(`${this.API_URI}/products/categoria/list`);
  }

  addCategoria(data: any) {
    return this.http.post(`${this.API_URI}/products/addcategoria`, data);
  }


}
