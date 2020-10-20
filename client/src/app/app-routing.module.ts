import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent} from './components/user-form/user-form.component'
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HelpDeskComponent } from './components/help-desk/help-desk.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ProductoComponent } from './components/producto/producto.component';
import { NewProductoComponent } from './components/new-producto/new-producto.component';
import { OneProductComponent } from './components/one-product/one-product.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { EditInicioComponent } from './components/edit-inicio/edit-inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'users/:id',
    component: UserListComponent
  },
  {
    path: 'users/add/:id',
    component: UserFormComponent
  },
  {
    path: 'principal/:id',
    component: EditInicioComponent
  },
  {
    path: 'users/edit/:id/:ide',
    component: UserFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'helpdesk/:id',
    component: HelpDeskComponent
  },
  {
    path: 'cliente/:id',
    component: ClienteComponent
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent
  },
  {
    path: 'producto/:id',
    component: ProductoComponent
  },
  {
    path: 'producto/add/:id',
    component: NewProductoComponent
  },
  {
    path: 'producto/edit/:id/:idp',
    component: NewProductoComponent
  },
  {
    path: 'producto/details/:id',
    component: OneProductComponent
  },
  {
    path: 'producto/details/:id/:idp',
    component: OneProductComponent
  },
  {
    path: 'producto/comments/:id/:idp',
    component: ComentariosComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'bitacora/:id',
    component: BitacoraComponent
  },
  {
    path: 'categoria/:id',
    component: CategoriaComponent
  },
  {
    path: 'reportes/:id',
    component: ReporteComponent
  },
  {
    path: 'chat/:id',
    component: ChatComponent
  },
  {
    path: "**",
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
