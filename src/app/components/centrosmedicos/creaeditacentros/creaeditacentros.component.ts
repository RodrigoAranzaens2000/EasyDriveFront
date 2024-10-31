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
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
@Component({
  selector: 'app-creaeditacentros',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './creaeditacentros.component.html',
  styleUrl: './creaeditacentros.component.css'
})
export class CreaeditacentrosComponent {
  form: FormGroup = new FormGroup({});
  centros: CentrosMedicos = new CentrosMedicos();

  id: number = 0;
  edicion: boolean = false;

  listaMarcas: { value: string; viewValue: string }[] = [

  ];
  constructor(
    private formBuilder: FormBuilder,
    private cS: CentrosmedicosService,
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
      hruc: ['', Validators.required],
      himagen: ['', Validators.required]

    });
  }
  aceptar() {
    if (this.form.valid) {
      this.centros.idcentro = this.form.value.hcodigo;
      this.centros.nombre = this.form.value.hnombre;
      this.centros.ruc = this.form.value.hruc;
      this.centros.imgCentro = this.form.value.himagen;
      if (this.edicion) {
        //update
        this.cS.update(this.centros).subscribe(data=> {
          this.cS.list().subscribe(data=>{
            this.cS.setList(data)
          })
        });
      } else {
        //insertar
        this.cS.insert(this.centros).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['centrosmedicos']);
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idcentro),
          hnombre: new FormControl(data.nombre),
          hruc: new FormControl(data.ruc),
          himagen: new FormControl(data.imgCentro),
          
        });
      });
    }
  }
}
