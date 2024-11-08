import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Reservas } from '../../../models/Reservas';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReservasService } from '../../../services/reservas.service';

@Component({
  selector: 'app-creaeditapagos',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    CommonModule,],
  templateUrl: './creaeditapagos.component.html',
  styleUrl: './creaeditapagos.component.css'
})
export class CreaeditapagosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaReservas: Reservas[] = [];
  pagos: Pagos = new Pagos();

  id: number = 0;
  edicion: boolean = false;

  listaMetodos: { value: string; viewValue: string }[] = [
    { value: 'Tarjeta de Credito', viewValue: 'Tarjeta de Credito' },
    { value: 'Tarjeta de Debito', viewValue: 'Tarjeta de Debito' },
    { value: 'Efectivo', viewValue: 'Efectivo' },
    { value: 'Billetera Digital', viewValue: 'Billetera Digital' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private pS: PagosService,
    private rS: ReservasService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hmetodo: ['', Validators.required],
      hfecha: ['', Validators.required], 
      hreserva: ['', Validators.required],
    });
    this.rS.list().subscribe((data) => {
      this.listaReservas = data;
    });
  }
  aceptar() : void{
    if (this.form.valid) {
      this.pagos.idpago = this.form.value.hcodigo;
      this.pagos.metodoPago = this.form.value.hmetodo;
      this.pagos.fechaPago = this.form.value.hfecha;
      this.pagos.res = this.form.value.hreserva;
      if (this.edicion) {
        // Actualizar el centro médico
        this.pS.update(this.pagos).subscribe(data=> {
          this.pS.list().subscribe(data=>{
            this.pS.setList(data)
          })
        });
      } else {
        // Insertar nuevo centro médico
        this.pS.insert(this.pagos).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['pagos']);
    }

  }
    init() {
      if (this.edicion) {
        this.pS.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            hcodigo: new FormControl(data.idpago),
            hmetodo: new FormControl(data.metodoPago),
            hfecha: new FormControl(data.fechaPago),
            hreserva: new FormControl(data.res)
          });
        });
      };
    }
}

