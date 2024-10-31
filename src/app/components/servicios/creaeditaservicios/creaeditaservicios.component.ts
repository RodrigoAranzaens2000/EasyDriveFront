import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar MatSnackBar
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Servicios } from '../../../models/Servicios';
import { ServiciosService } from '../../../services/servicios.service';

@Component({
  selector: 'app-creaeditaservicios',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './creaeditaservicios.component.html',
  styleUrls: ['./creaeditaservicios.component.css']
})
export class CreaeditaserviciosComponent implements OnInit {
  form: FormGroup;
  servicios: Servicios = new Servicios();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private sS: ServiciosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Inyectar MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hprecio: ['', [Validators.required, Validators.pattern("^[0-9]*$")]], // Solo números
      himagen: ['', Validators.required]
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
      this.servicios = {
        idservicio: this.form.value.hcodigo,
        nombreServicio: this.form.value.hnombre,
        descripcion: this.form.value.hdescripcion,
        precio: this.form.value.hprecio,
        imgServicio: this.form.value.himagen,
      };

      if (this.edicion) {
        this.sS.update(this.servicios).subscribe(() => {
          this.listarServicios();
        });
      } else {
        this.sS.insert(this.servicios).subscribe(() => {
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
    this.sS.list().subscribe(data => {
      this.sS.setList(data);
      this.router.navigate(['servicios']);
    });
  }

  private init() {
    this.sS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        hcodigo: data.idservicio,
        hnombre: data.nombreServicio,
        hdescripcion: data.descripcion,
        hprecio: data.precio,
        himagen: data.imgServicio,
      });
    });
  }
}
