import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  form: FormGroup;
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
  ) {
    this.form = this.formBuilder.group({
      hcodigo: [''],
      hfecha: ['', Validators.required],
      hreserva: ['', Validators.required],
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
    this.rS.list().subscribe((data) => {
      this.listaReservas = data;
    });
  }

  aceptar() : void {
    if (this.form.valid) {
      this.calendarios.idcalendario = this.form.value.hcodigo;
      this.calendarios.fechaSincronizacion= this.form.value.hfecha;
      this.calendarios.reserva.idreserva= this.form.value.hreserva;


      this.cS.insert(this.calendarios).subscribe(() => {
        this.listarCalendario();
      });
      this.router.navigate(['calendario']);
    }
  }

  private listarCalendario() {
    this.cS.list().subscribe((data) => {
      this.cS.setList(data);
      this.router.navigate(['calendario']);
    });
  }

  private init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        hcodigo: data.idcalendario,
        hfecha: data.fechaSincronizacion,
        hreserva: data.reserva,
      });
    });
  }
}
