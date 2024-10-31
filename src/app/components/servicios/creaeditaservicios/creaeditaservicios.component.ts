import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Servicios } from '../../../models/Servicios';
import { ServiciosService } from '../../../services/servicios.service';

@Component({
  selector: 'app-creaeditaservicios',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creaeditaservicios.component.html',
  styleUrl: './creaeditaservicios.component.css'
})
export class CreaeditaserviciosComponent {
  form: FormGroup = new FormGroup({});
  servicios: Servicios = new Servicios();

  id: number = 0;
  edicion: boolean = false;

  listaMarcas: { value: string; viewValue: string }[] = [

  ];
  constructor(
    private formBuilder: FormBuilder,
    private sS: ServiciosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hnombre: ['', Validators.required],
      hdescripcion: ['', Validators.required],
      hprecio: ['', Validators.required],
      himagen: ['', Validators.required],

    });
  }
  aceptar() {
    if (this.form.valid) {
      this.servicios.idservicio = this.form.value.hcodigo;
      this.servicios.nombreServicio = this.form.value.hnombre;
      this.servicios.descripcion = this.form.value.hdescripcion;
      this.servicios.precio = this.form.value.hprecio;
      this.servicios.imgServicio = this.form.value.himagen;
      if (this.edicion) {
        //update
        this.sS.update(this.servicios).subscribe(data=> {
          this.sS.list().subscribe(data=>{
            this.sS.setList(data)
          })
        });
      } else {
        //insertar
        this.sS.insert(this.servicios).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['servicios']);
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idservicio),
          hnombre: new FormControl(data.nombreServicio),
          hdescripcion: new FormControl(data.descripcion),
          hprecio: new FormControl(data.precio),
          himagen: new FormControl(data.imgServicio),
          
        });
      });
    }
  }
}