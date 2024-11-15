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
  imports: [MatFormFieldModule,
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
  form: FormGroup = new FormGroup({});
  listausuarios: Usuarios[] = [];
  listapromociones: Promocion[] = [];
  listaescuelas: Escuelas[] = [];
  listacentros: CentrosMedicos[] = [];
  listaservicios: Servicios[] = [];
  id: number = 0;
  edicion: boolean = false;
  reservas: Reservas = new Reservas();

  listaEstados: { value: string; viewValue: string }[] = [
    { value: 'Confirmada', viewValue: 'Confirmada' },
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'Cancelada', viewValue: 'Cancelada' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private pS: PromocionesService,
    private eS: EscuelasService,
    private cS: CentrosmedicosService,
    private sS: ServiciosService,
    private rS: ReservasService,
    public router: Router,
    private route:ActivatedRoute
  ) { this.form = this.formBuilder.group({
    hcodigo: [''],
    hestado: ['', Validators.required],
    hfecha: ['', Validators.required],
    husuario: ['', Validators.required],
    hescuela: ['', Validators.required],
    hcentro: ['', Validators.required],
    hservicio: ['', Validators.required],
    hpromocion: ['', Validators.required],
  });}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      if (this.edicion) {
        this.init();
      }
    });
    
    this.uS.list().subscribe((data) => {
      this.listausuarios = data;
    });
    this.cS.list().subscribe((data) => {
      this.listacentros = data;
    });
    this.sS.list().subscribe((data) => {
      this.listaservicios = data;
    });
    this.eS.list().subscribe((data) => {
      this.listaescuelas = data;
    });
    this.pS.list().subscribe((data) => {
      this.listapromociones = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.reservas.idreserva = this.form.value.hcodigo;
      this.reservas.estadoReserva = this.form.value.hestado;
      this.reservas.fechaReserva = this.form.value.hfecha;
      this.reservas.user.id = this.form.value.husuario;
      this.reservas.centros.idcentro = this.form.value.hcentro;
      this.reservas.prom.idpromocion = this.form.value.hpromocion;
      this.reservas.ser.idservicio = this.form.value.hservicio;
      this.reservas.esc.idescuela= this.form.value.hescuela;


      this.rS.insert(this.reservas).subscribe(() => {
        this.listaReservas();
      });
      this.router.navigate(['reservas']);
    }
  }

  private listaReservas() {
    this.rS.list().subscribe((data) => {
      this.rS.setList(data);
      this.router.navigate(['reservas']);
    });
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idreserva),
          hestado: new FormControl(data.estadoReserva),
          hfecha: new FormControl(data.fechaReserva),
          huser: new FormControl(data.user.id),
          hcentro: new FormControl(data.centros.idcentro),
          hpromocion: new FormControl(data.prom.idpromocion),
          hservicio:new FormControl(data.ser.idservicio),
          hescuela:new FormControl(data.esc.idescuela),
        });
      });
    }
  }

  /*private init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        hcodigo: data.idreserva,
        hestado: data.estadoReserva,
        hfecha: data.fechaReserva,
        huser: data.user,
        hcentro: data.centros,
        hpromocion: data.prom,
        hservicio: data.ser,
        hescuela: data.esc,
      });
    });
  }*/
}



/**export class CreaeditareservasComponent {
  form: FormGroup = new FormGroup({});
  listausuarios: Usuarios[] = [];
  listaescuelas: Escuelas[] = [];
  listacentros: CentrosMedicos[] = [];
  listaservicios: Servicios[] = [];
  listaPromociones: Promocion[] = [];
  reservas: Reservas = new Reservas();

  edicion: boolean = false;
  id: number = 0;

  listaEstados: { value: string; viewValue: string }[] = [
    { value: 'Confirmada', viewValue: 'Confirmada' },
    { value: 'Pendiente', viewValue: 'Pendiente' },
    { value: 'Cancelada', viewValue: 'Cancelada' },
  ];

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
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      if (this.edicion) {
        this.init();
      }
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      huser: [''],
      hescuela: [''],
      hcentro: [''],
      hservicio: [''],
      hpromocion: [''],
      hestado: ['', Validators.required],
      hfecha: ['', Validators.required],
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

    
      this.reservas.user = { id: this.form.value.huser } as Usuarios;
this.reservas.esc = { idescuela: this.form.value.hescuela } as Escuelas;
this.reservas.centros = { idcentro: this.form.value.hcentro } as CentrosMedicos;
this.reservas.ser = { idservicio: this.form.value.hservicio } as Servicios;
this.reservas.prom = { idpromocion: this.form.value.hpromocion } as Promocion;

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
          hcentro: new FormControl(data.centros),
        });
      });
    }
  }
}
 */