import { Component } from '@angular/core';
import { UsuariosService } from '../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarios } from '../../models/Usuarios';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatIcon,

    ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form: FormGroup;
  usuarios: Usuarios = new Usuarios();
  id: number = 0;
  edicion: boolean = false;
  hidePassword: boolean = true;
  password: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      husername: ['', Validators.required],
      hname: ['', Validators.required],
      hapellidoPaterno: ['', Validators.required],
      hapellidoMaterno: ['', Validators.required],
      hcorreo: ['', [Validators.required, Validators.email]],
      hpassword: ['', Validators.required],
      hfoto: ['', Validators.required],
      hdireccion: ['', Validators.required],
      htelefono: ['', Validators.required]
    });

  }

  aceptar() {
    if (this.form.valid) {
      this.usuarios = {
        id: this.form.value.hcodigo,
        password: this.form.value.hpassword,
        enabled: true,
        username: this.form.value.husername,
        name: this.form.value.hname,
        apellidoMaterno: this.form.value.hapellidoMaterno,
        apellidoPaterno: this.form.value.hapellidoPaterno,
        correo: this.form.value.hcorreo,
        fotoPerfil: this.form.value.hfoto,
        direccion: this.form.value.hdireccion,
        numeroTelefono: this.form.value.htelefono
      };


      this.uS.insert(this.usuarios).subscribe(() => {
        this.listarusuarios();
      });
      this.router.navigate(['login']);
    }
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: message.includes('exitoso') ? ['success-snackbar'] : ['error-snackbar']
    });
  }
  private listarusuarios() {
    this.uS.list().subscribe(data => {
      this.uS.setList(data);
      this.router.navigate(['login']);
    });
  }
  
  login() {
    if (!this.password) {
      this.showMessage('Por favor, complete todos los campos');
      return;
    }
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.login();
    }
  }
}
