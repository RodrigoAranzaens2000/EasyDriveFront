import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';

@Component({
  selector: 'app-creaeditacentros',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaeditacentros.component.html',
  styleUrls: ['./creaeditacentros.component.css'], // Corrige a styleUrls
})
export class CreaeditacentrosComponent implements OnInit {
  form: FormGroup;
  centros: CentrosMedicos = new CentrosMedicos();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cS: CentrosmedicosService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    // Inicializa el formulario en el constructor
    this.form = this.formBuilder.group({
      hcodigo: ['', Validators.required],
      hnombre: ['', Validators.required],
      hruc: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Solo números
      hdireccion: ['', Validators.required],
      htelefono: ['', Validators.required],
      himagen: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      if (this.edicion) {
        this.init();
      }
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.centros.idcentro = this.form.value.hcodigo;
      this.centros.nombre = this.form.value.hnombre;
      this.centros.ruc = this.form.value.hruc;
      this.centros.imgCentro = this.form.value.himagen;
      this.centros.direccion = this.form.value.hdireccion;
      this.centros.numeroTelefono = this.form.value.htelefono;

      if (this.edicion) {
        // Actualizar el centro médico
        this.cS.update(this.centros).subscribe(() => {
          this.listarCentros();
        });
      } else {
        // Insertar nuevo centro médico
        this.cS.insert(this.centros).subscribe(() => {
          this.listarCentros();
        });
      }
    }
  }
  private listarCentros() {
    this.cS.list().subscribe((data) => {
      this.cS.setList(data);
      this.router.navigate(['centrosmedicos']);
    });
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcodigo: data.idcentro,
          hnombre: data.nombre,
          hruc: data.ruc,
          himagen: data.imgCentro,
          hdireccion: data.direccion,
          htelefono: data.numeroTelefono,

        });
      });
    }
  }
}
