import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Promocion } from '../../../models/Promocion';
import { Reservas } from '../../../models/Reservas';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuario.service';
import { EscuelasService } from '../../../services/escuelas.service';
import { PromocionesService } from '../../../services/promociones.service';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { ServiciosService } from '../../../services/servicios.service';
import { Escuelas } from '../../../models/Escuelas';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { Servicios } from '../../../models/Servicios';
import { Usuarios } from '../../../models/Usuarios';
import { ReservasService } from '../../../services/reservas.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditareservas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './creaeditareservas.component.html',
  styleUrl: './creaeditareservas.component.css'
})
export class CreaeditareservasComponent {
  form: FormGroup;
  listaPromociones: Promocion[] = [];
  listaescuelas: Escuelas[] = [];
  listacentros: CentrosMedicos[] = [];
  listaservicios: Servicios[] = [];
  listausuarios: Usuarios[] = [];
  reservas: Reservas = new Reservas();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private eS: EscuelasService,
    private pS: PromocionesService,
    private uS: UsuariosService,
    private cS: CentrosmedicosService,
    private sS: ServiciosService,
    private rS: ReservasService
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hestado: ['', Validators.required],
      hfecha: ['', Validators.required],
      huser: [''],
      hescuela: [''],
      hcentro: [''],
      hservicio: [''],
      hpromocion: [''],
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
    this.cS.list().subscribe((data) => {
      this.listacentros = data;
    });
    this.eS.list().subscribe((data) => {
      this.listaescuelas = data;
    });
    this.sS.list().subscribe((data) => {
      this.listaservicios = data;
    });
    this.uS.list().subscribe((data) => {
      this.listausuarios = data;
    });
  }

  aceptar() : void {
    if (this.form.valid) {
      this.reservas.idreserva = this.form.value.hcodigo;
      this.reservas.estadoReserva = this.form.value.hestado;
      this.reservas.fechaReserva = this.form.value.hfecha;
      this.reservas.user.username = this.form.value.huser;
      this.reservas.ser.nombreServicio = this.form.value.hservicio
      this.reservas.esc.nombre = this.form.value.hescuela
      this.reservas.prom.idpromocion = this.form.value.hpromocion;
      this.reservas.cen.nombre = this.form.value.hcentro;

      if (this.edicion) {
        //update
        this.rS.update(this.reservas).subscribe(data=> {
          this.rS.list().subscribe(data=>{
            this.rS.setList(data)
          })
        });
      } else {
        //insertar
        this.rS.insert(this.reservas).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['reservas']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idreserva),
          hestado: new FormControl(data.estadoReserva),
          hfecha: new FormControl(data.fechaReserva),
          huser: new FormControl(data.user),
          hservicio: new FormControl(data.ser),
          hescuela: new FormControl(data.esc),
          hpromocion: new FormControl(data.prom),
          hcentro: new FormControl(data.cen),

        });
      });
    }
  }
}
