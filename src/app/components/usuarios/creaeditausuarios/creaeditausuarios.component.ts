
import { Usuarios } from '../../../models/Usuarios';
import { UsuariosService } from '../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditausuarios',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creaeditausuarios.component.html',
  styleUrl: './creaeditausuarios.component.css'
})
export class CreaeditausuariosComponent {

  form: FormGroup;
  usuarios: Usuarios = new Usuarios();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      husername: ['', Validators.required],
      hname: ['', Validators.required],
      hapellidoPaterno: ['', Validators.required],
      hapellidoMaterno: ['', Validators.required],
      hcorreo: ['', [Validators.required, Validators.email]],
      hpassword: ['', Validators.required],
      henabled: [true, Validators.required],// Valor por defecto y validación
      hfoto: ['', Validators.required],
      hdireccion: ['', Validators.required],
      htelefono: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      if (this.edicion) {
        this.init();
      }
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.usuarios = {
        id: this.form.value.hcodigo,
        password: this.form.value.hpassword,
        enabled: this.form.value.henabled,
        username: this.form.value.husername,
        name: this.form.value.hname,
        apellidoMaterno: this.form.value.hapellidoMaterno,
        apellidoPaterno: this.form.value.hapellidoPaterno,
        correo: this.form.value.hcorreo,
        fotoPerfil: this.form.value.hfoto,
        direccion: this.form.value.hdireccion,
        numeroTelefono: this.form.value.htelefono
      };

      if (this.edicion) {
        this.uS.update(this.usuarios).subscribe(() => {
          this.listarusuarios();
        });
      } else {
        this.uS.insert(this.usuarios).subscribe(() => {
          this.listarusuarios();
        });
      }
    }
  }

  private listarusuarios() {
    this.uS.list().subscribe(data => {
      this.uS.setList(data);
      this.router.navigate(['usuarios']);
    });
  }

  private init() {
    this.uS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        hcodigo: data.id,
        husername: data.username,
        hpassword: data.password,
        henabled: data.enabled,
        hname: data.name,
        hapellidoMaterno: data.apellidoMaterno,
        hapellidoPaterno: data.apellidoPaterno,
        hcorreo: data.correo,
        hfoto: data.fotoPerfil,
        hdireccion: data.direccion,
        htelefono: data.numeroTelefono
      });
    });
  }

}
