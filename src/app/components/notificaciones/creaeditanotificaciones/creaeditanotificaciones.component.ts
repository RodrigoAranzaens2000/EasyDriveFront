import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificaciones } from '../../../models/Notificaciones';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { UsuariosService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Usuarios } from '../../../models/Usuarios';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-creaeditanotificaciones',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule, // Agregar CommonModule aquí
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditanotificaciones.component.html',
  styleUrls: ['./creaeditanotificaciones.component.css']
})
export class CreaeditanotificacionesComponent {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  noti: Notificaciones = new Notificaciones();

  constructor(
    private formBuilder: FormBuilder,
    private nS: NotificacionesService,
    private uS: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hfecha: ['', Validators.required],
      hmensaje: ['', Validators.required],
      htitulo: ['', Validators.required],
      huser: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.noti.fechaNotificacion = this.form.value.hfecha;
      this.noti.mensaje = this.form.value.hmensaje;
      this.noti.titulo = this.form.value.htitulo;
      this.noti.user.id = this.form.value.huser;

      this.nS.insert(this.noti).subscribe((data) => {
        this.nS.list().subscribe((data) => {
          this.nS.setList(data);
        });
      });
      this.router.navigate(['notificaciones']);
    }
  }
}
