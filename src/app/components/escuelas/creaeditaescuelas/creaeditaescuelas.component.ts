import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Escuelas } from '../../../models/Escuelas';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Promocion } from '../../../models/Promocion';
import { EscuelasService } from '../../../services/escuelas.service';
import { PromocionesService } from '../../../services/promociones.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creaeditaescuelas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditaescuelas.component.html',
  styleUrl: './creaeditaescuelas.component.css',
})
export class CreaeditaescuelasComponent implements OnInit {
  form: FormGroup;
  listaPromociones: Promocion[] = [];
  escuelas: Escuelas = new Escuelas();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private eS: EscuelasService,
    private pS: PromocionesService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hruc: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      himagen: ['', Validators.required],
      hpromocion: ['', Validators.required],
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
    this.pS.list().subscribe((data) => {
      this.listaPromociones = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.escuelas.idescuela = this.form.value.hcodigo;
        this.escuelas.nombre = this.form.value.hnombre;
        this.escuelas.ruc = this.form.value.hruc;
        this.escuelas.imgEscuela = this.form.value.himagen;
        this.escuelas.prom.idpromocion = this.form.value.hpromocion;

      if (this.edicion) {
        this.eS.update(this.escuelas).subscribe(() => {
          this.listarEscuelas();
        });
      } else {
        this.eS.insert(this.escuelas).subscribe(() => {
          this.listarEscuelas();
        });
      }
      this.router.navigate(['escuelas']);
    } else {
      let mensajeError = 'Todos los campos deben estar llenos';
      // Mostrar notificación de error
    if(this.form.get('hnombre')?.hasError('required')||
    this.form.get('hruc')?.hasError('required')||
    this.form.get('hpromocion')?.hasError('required')||
    this.form.get('himagen')?.hasError('required')){
      mensajeError = 'Todos los campos deben estar llenos'
    } else if (this.form.get('hruc')?.hasError('pattern')){
      mensajeError = 'El ruc debe ser un número válido.'
    }
    this.snackBar.open(mensajeError, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar'],
    });
  }
  }

  private listarEscuelas() {
    this.eS.list().subscribe((data) => {
      this.eS.setList(data);
      this.router.navigate(['escuelas']);
    });
  }

  private init() {
    this.eS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        hcodigo: data.idescuela,
        hnombre: data.nombre,
        hruc: data.ruc,
        himagen: data.imgEscuela,
        hpromocion: data.prom,
      });
    });
  }
}
