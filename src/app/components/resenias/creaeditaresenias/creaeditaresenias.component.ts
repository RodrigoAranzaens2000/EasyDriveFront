import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { Escuelas } from '../../../models/Escuelas';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { Resenias } from '../../../models/Resenias';
import { ReseniasService } from '../../../services/resenias.service';
import { UsuariosService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EscuelasService } from '../../../services/escuelas.service';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaresenias',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditaresenias.component.html',
  styleUrls: ['./creaeditaresenias.component.css'],
})
export class CreaeditareseniasComponent {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  listaEscuelas: Escuelas[] = [];
  listaCentros: CentrosMedicos[] = [];
  id: number = 0;
  edicion: boolean = false;
  rese: Resenias = new Resenias();
  today:Date=new Date()

  listaCalificacion: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private rS: ReseniasService,
    private uS: UsuariosService,
    private eS: EscuelasService,
    private cS: CentrosmedicosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtenemos el ID de la notificación si existe en los parámetros de la ruta
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null; // Verificamos si estamos en modo de edición
      this.init(); // Llamamos a la función para inicializar los datos
    });

    this.form = this.formBuilder.group({
      hfecha: ['', Validators.required],
      hcomentario: ['', Validators.required],
      huser: ['', Validators.required],
      hcalificacion: ['', Validators.required],
      hescuela: ['', Validators.required],
      hcentro: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.eS.list().subscribe((data) => {
      this.listaEscuelas = data;
    });
    this.cS.list().subscribe((data) => {
      this.listaCentros = data;
    });
  }

  // Función para inicializar los datos cuando estamos en modo de edición
  init(): void {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form.setValue({
          hfecha: data.fechaResenia,
          hcomentario: data.comentario,
          huser: data.user.id,
          hcalificacion: data.calificacion,
          hescuela: data.esc.idescuela,
          hcentro: data.centros.idcentro,
        });

        // Asignar el ID de la reseña para la actualización
        this.rese.idresenia = data.idresenia;  // Asignar el ID de la reseña para la actualización
      });
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rese.comentario = this.form.value.hcomentario;
      this.rese.calificacion = this.form.value.hcalificacion;
      this.rese.fechaResenia = this.form.value.hfecha;
      this.rese.user.id = this.form.value.huser;
      this.rese.esc.idescuela = this.form.value.hescuela;
      this.rese.centros.idcentro = this.form.value.hcentro;

      if (this.edicion) {
        // Actualizar la reseña
        this.rS.update(this.rese).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        // Insertar nueva reseña
        this.rS.insert(this.rese).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }

      this.router.navigate(['resenias']);
    }
  }
}
