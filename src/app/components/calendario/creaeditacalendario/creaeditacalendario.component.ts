import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Reservas } from '../../../models/Reservas';
import { Calendario } from '../../../models/Calendario';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CalendarioService } from '../../../services/calendario.service';
import { ReservasService } from '../../../services/reservas.service';

@Component({
  selector: 'app-creaeditacalendario',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, // Agregar CommonModule aquí
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './creaeditacalendario.component.html',
  styleUrl: './creaeditacalendario.component.css'
})
export class CreaeditacalendarioComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  listaReservas: Reservas[] = [];
  calendarios: Calendario = new Calendario();

  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private rS: ReservasService,
    private cS: CalendarioService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hfecha: ['', Validators.required],
      hreserva: ['', Validators.required],
    });

    this.rS.list().subscribe((data) => {
      this.listaReservas = data;
    });
  }

  aceptar() : void {
    if (this.form.valid) {
      this.calendarios.idcalendario = this.form.value.hcodigo;
      this.calendarios.fechaSincronizacion= this.form.value.hfecha;
      this.calendarios.res= this.form.value.hreserva;
      if (this.edicion) {
        // Actualizar el centro médico
        this.cS.update(this.calendarios).subscribe(data=> {
          this.cS.list().subscribe(data=>{
            this.cS.setList(data)
          })
        });
      } else {
        // Insertar nuevo centro médico
        this.cS.insert(this.calendarios).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['calendario']);
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idcalendario),
          hfecha: new FormControl(data.fechaSincronizacion),
          hreserva: new FormControl(data.res)
        });
      });
    };
  }
}
