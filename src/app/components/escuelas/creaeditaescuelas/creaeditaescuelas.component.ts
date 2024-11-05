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
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hruc: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      himagen: ['', Validators.required],
      hdireccion: ['', Validators.required],
      htelefono: ['', Validators.required],
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
      this.escuelas.direccion = this.form.value.hdireccion
      this.escuelas.numeroTelefono = this.form.value.htelefono
      this.escuelas.prom.idpromocion = this.form.value.hpromocion;


      this.eS.insert(this.escuelas).subscribe(() => {
        this.listarEscuelas();
      });
      this.router.navigate(['escuelas']);
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
        hdireccion: data.direccion,
        htelefono: data.numeroTelefono,
        hpromocion: data.prom,
      });
    });
  }
}
