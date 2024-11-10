import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { Escuelas } from '../../../models/Escuelas';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { Resenias } from '../../../models/Resenias';
import { ReseniasService } from '../../../services/resenias.service';
import { UsuariosService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EscuelasService } from '../../../services/escuelas.service';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaeditaresenias',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './creaeditaresenias.component.html',
  styleUrl: './creaeditaresenias.component.css'
})
export class CreaeditareseniasComponent {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  listaEscuelas: Escuelas[] = [];
  listaCentros: CentrosMedicos[] = [];
  id: number = 0;
  edicion: boolean = false;
  rese: Resenias = new Resenias();

  listaCalificacion: { value: string; viewValue: string }[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
  ];

  constructor(private formBuilder: FormBuilder,
    private rS: ReseniasService,
    private uS: UsuariosService,
    private eS: EscuelasService,
    private cS: CentrosmedicosService,
    private router: Router,
    private route:ActivatedRoute
  ){
      this.form = this.formBuilder.group({
        hfecha: ['', Validators.required],
        hcomentario: ['', Validators.required],
        huser: ['', Validators.required],
        hcalificacion: ['', Validators.required],
        hescuela: ['', Validators.required],
        hcentro: ['', Validators.required]
      });
    }
    ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.edicion = this.id != null;
          this.init();  
      });
      this.uS.list().subscribe((data) => {
        this.listaUsuarios = data;
      });
      this.eS.list().subscribe((data) => {
        this.listaEscuelas = data;
      });
      this.cS.list().subscribe((data) => {
        this.listaCentros = data;
      });
    }
    aceptar() : void {
      if (this.form.valid) {
        this.rese.comentario = this.form.value.hcomentario;
        this.rese.calificacion = this.form.value.hcalificacion;
        this.rese.fechaResenia = this.form.value.hfecha;
        this.rese.user.id = this.form.value.huser;
        this.rese.esc.idescuela = this.form.value.hescuela;
        this.rese.centros.idcentro = this.form.value.hcentro;
        this.rS.insert(this.rese).subscribe(() => {
          this.listaResenias();
        });
        this.router.navigate(['resenias']);
      }
    }

    private listaResenias() {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
        this.router.navigate(['resenias']);
      });
    }
    private init() {
      this.rS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          hcomentario: data.comentario,
          hcalificacion: data.calificacion,
          hfecha: data.fechaResenia,
          huser: data.user,
          hescuela: data.esc,
          hcentro: data.centros,
        });
      });
    }
}
