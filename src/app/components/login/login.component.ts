import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from '../../models/jwtRequest';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  mensaje: string = '';
  hidePassword: boolean = true;  // Para controlar la visibilidad de la contraseña
  loading: boolean = false;      // Para mostrar estado de carga durante el login

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Verificar si ya hay una sesión activa
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['homes']);
    }
  }

  login() {
    if (!this.username || !this.password) {
      this.showMessage('Por favor, complete todos los campos');
      return;
    }

    this.loading = true;
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.showMessage('Inicio de sesión exitoso');
        this.router.navigate(['homes']);
      },
      error: (error) => {
        console.error('Error durante el login:', error);
        this.mensaje = 'Credenciales invalidas';
        this.showMessage(this.mensaje);
        this.password = ''; // Limpiar contraseña por seguridad
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: message.includes('exitoso') ? ['success-snackbar'] : ['error-snackbar']
    });
  }

  // Método para manejar el enter key en los inputs
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  // Método para limpiar el formulario
  resetForm() {
    this.username = '';
    this.password = '';
    this.mensaje = '';
  }
}