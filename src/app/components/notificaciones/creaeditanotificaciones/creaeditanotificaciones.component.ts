import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificaciones } from '../../../models/Notificaciones';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { UsuariosService } from '../../../services/usuario.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
export class CreaeditanotificacionesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  noti: Notificaciones = new Notificaciones();
  id: number = 0; // Variable para el ID de la notificación
  edicion: boolean = false; // Para verificar si es edición o creación
  today: Date = new Date()

  constructor(
    private formBuilder: FormBuilder,
    private nS: NotificacionesService,
    private uS: UsuariosService,
    private router: Router,
    private route: ActivatedRoute // Para leer los parámetros de la ruta
  ) {}

  ngOnInit(): void {
    // Obtenemos el ID de la notificación si existe en los parámetros de la ruta
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null; // Verificamos si estamos en modo de edición
      this.init(); // Llamamos a la función para inicializar los datos
    });

    // Inicializamos el formulario
    this.form = this.formBuilder.group({
      hfecha: ['', Validators.required],
      hmensaje: ['', Validators.required],
      htitulo: ['', Validators.required],
      huser: ['', Validators.required],
    });

    // Obtenemos la lista de usuarios
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  // Función para inicializar los datos cuando estamos en modo de edición
  init(): void {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form.setValue({
          hfecha: data.fechaNotificacion,
          hmensaje: data.mensaje,
          htitulo: data.titulo,
          huser: data.user.id,
        });
      });
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.noti.fechaNotificacion = this.form.value.hfecha;
      this.noti.mensaje = this.form.value.hmensaje;
      this.noti.titulo = this.form.value.htitulo;
      this.noti.user.id = this.form.value.huser;

      if (this.edicion) {
        // Actualizar la notificación
        this.nS.update(this.noti).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      } else {
        // Insertar nueva notificación
        this.nS.insert(this.noti).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      }

      // Redirigir a la lista de notificaciones
      this.router.navigate(['notificaciones']);
    }
  }
}
