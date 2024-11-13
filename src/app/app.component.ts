import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CentrosmedicosComponent } from "./components/centrosmedicos/centrosmedicos.component";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from './services/login.service';
import { UsuariosService } from './services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { Usuarios } from './models/Usuarios';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ServiciosComponent,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
  FormsModule,
CommonModule,
MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EasyDriveFront';
  role: string = '';
  username: string = '';
  constructor(private loginService: LoginService) {}

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    this.username = this.loginService.showUser();
    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMINISTRADOR';
  }

  isUser() {
    return this.role === 'USUARIO';
  }

  
}
  

