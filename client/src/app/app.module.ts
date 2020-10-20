import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

import {UsersService} from './services/users.service';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HelpDeskComponent } from './components/help-desk/help-desk.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProductoComponent } from './components/producto/producto.component';
import { NewProductoComponent } from './components/new-producto/new-producto.component'
import { PortadasService } from './services/portadas.service';
import { LoginService } from './services/login.service';
import { ProductoService } from './services/producto.service';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { EditInicioComponent } from './components/edit-inicio/edit-inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ChatService } from './services/chat.service';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserFormComponent,
    UserListComponent,
    LoginComponent,
    InicioComponent,
    HelpDeskComponent,
    ClienteComponent,
    PerfilComponent,
    ProductoComponent,
    NewProductoComponent,
    OneProductComponent,
    ComentariosComponent,
    EditInicioComponent,
    RegistroComponent,
    BitacoraComponent,
    CarritoComponent,
    CategoriaComponent,
    ReporteComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsersService, PortadasService, LoginService, ProductoService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
