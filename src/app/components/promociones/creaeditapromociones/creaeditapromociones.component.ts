import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Promocion } from '../../../models/Promocion';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromocionesService } from '../../../services/promociones.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditapromociones',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,MatDatepickerModule],
  templateUrl: './creaeditapromociones.component.html',
  styleUrl: './creaeditapromociones.component.css'
})
export class CreaeditapromocionesComponent implements OnInit {
  form: FormGroup;
  promociones: Promocion = new Promocion();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private pS: PromocionesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hdescuento: ['', [Validators.required, Validators.pattern("^[0-9]*$")]], // Solo números
      hfechainicio: ['', Validators.required],
      hfechafin: ['', Validators.required]
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
      this.promociones = {
        idpromocion: this.form.value.hcodigo,
        nombrePromocion: this.form.value.hnombre,
        descripcion: this.form.value.hdescripcion,
        descuento: this.form.value.hdescuento,
        fechaInicio: this.form.value.hfechainicio,
        fechaFin: this.form.value.hfechafin
      };

      if (this.edicion) {
        this.pS.update(this.promociones).subscribe(() => {
          this.listarServicios();
        });
      } else {
        this.pS.insert(this.promociones).subscribe(() => {
          this.listarServicios();
        });
      }
    } else {
      // Mostrar notificación de error
      if (this.form.get('hprecio')?.hasError('pattern')) {
        this.snackBar.open('El precio debe ser un número válido.', 'Cerrar', {
          duration: 3000, // Duración en milisegundos
          panelClass: ['error-snackbar'] // Estilos personalizados si los necesitas
        });
      }
    }
  }

  private listarServicios() {
    this.pS.list().subscribe(data => {
      this.pS.setList(data);
      this.router.navigate(['promociones']);
    });
  }

  private init() {
    this.pS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        hcodigo: data.idpromocion,
        hnombre: data.nombrePromocion,
        hdescripcion: data.descripcion,
        hdescuento: data.descuento,
        hfechainicio: data.fechaInicio,
        hfechaifin: data.fechaFin,
      });
    });
  }
}
