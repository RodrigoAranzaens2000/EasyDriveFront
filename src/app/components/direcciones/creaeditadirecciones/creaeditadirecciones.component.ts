import { Component, Directive, OnInit } from '@angular/core';
import { DireccionesService } from '../../../services/direcciones.service';
import { UsuariosService } from '../../../services/usuario.service';
import { EscuelasService } from '../../../services/escuelas.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Escuelas } from '../../../models/Escuelas';
import { Direcciones } from '../../../models/Direcciones';
import { Usuarios } from '../../../models/Usuarios';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creaeditadirecciones',
  standalone: true,
  imports: [    CommonModule, // Agregar CommonModule aquí
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,],
  templateUrl: './creaeditadirecciones.component.html',
  styleUrl: './creaeditadirecciones.component.css'
})
export class CreaeditadireccionesComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  listaEscuelas: Escuelas[] = [];
  direc: Direcciones = new Direcciones();

  constructor(
    private formBuilder: FormBuilder,
    private dS: DireccionesService,
    private uS: UsuariosService,
    private eS: EscuelasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hcalle: ['', Validators.required],
      hciudad: ['', Validators.required],
      hpais: ['', Validators.required],
      hlatitud: ['', Validators.required],
      hestadProvincia: ['', Validators.required],
      hcodigoPostal: ['', Validators.required],
      hlongitud: ['' , Validators.required],
      huser: [''],
      hescuela: ['']
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.eS.list().subscribe((data) => {
      this.listaEscuelas = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.direc.calle = this.form.value.hcalle;
      this.direc.ciudad = this.form.value.hciudad;
      this.direc.codigoPostal = this.form.value.hcodigoPostal;
      this.direc.pais = this.form.value.hpais;
      this.direc.latitud = this.form.value.hlatitud;
      this.direc.estadProvincia = this.form.value.hestadProvincia;
      this.direc.longitud = this.form.value.hlongitud;
      this.direc.user.id = this.form.value.huser || null;
      this.direc.esc.idescuela = this.form.value.hescuela || null

      this.dS.insert(this.direc).subscribe((data) => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
      });
      this.router.navigate(['direcciones']);
    }
  }
}
