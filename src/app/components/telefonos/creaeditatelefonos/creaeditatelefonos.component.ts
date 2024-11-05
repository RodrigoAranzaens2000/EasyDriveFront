import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuarios } from '../../../models/Usuarios';
import { Escuelas } from '../../../models/Escuelas';
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { Telefonos } from '../../../models/Telefonos';
import { UsuariosService } from '../../../services/usuario.service';
import { TelefonosService } from '../../../services/telefonos.service';
import { EscuelasService } from '../../../services/escuelas.service';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-creaeditatelefonos',
  standalone: true,
  imports: [CommonModule, // Agregar CommonModule aquí
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule],
  templateUrl: './creaeditatelefonos.component.html',
  styleUrl: './creaeditatelefonos.component.css'
})
export class CreaeditatelefonosComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  listaUsuarios: Usuarios[] = [];
  listaEscuelas: Escuelas[] = [];
  listaCentros: CentrosMedicos[] = [];
  tel: Telefonos = new Telefonos();

  constructor(
    private formBuilder: FormBuilder,
    private tS: TelefonosService,
    private uS: UsuariosService,
    private eS: EscuelasService,
    private cS: CentrosmedicosService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      htelefono: ['', Validators.required],
      htipotelefono: [''],
      hanexoescuela: ['', Validators.required],
      huser: [''],
      hescuela: [''],
      hcentro: ['']
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

  aceptar(): void {
    if (this.form.valid) {
      this.tel.numeroTelefono = this.form.value.htelefono;
      this.tel.tipoDeTelefono = this.form.value.htipotelefono;
      this.tel.anexoEscuelas = this.form.value.hanexoescuela;
      this.tel.user.id = this.form.value.huser || null;
      this.tel.esc.idescuela= this.form.value.hescuela || null;
      this.tel.centros.idcentro = this.form.value.hcentro || null;


      this.tS.insert(this.tel).subscribe((data) => {
        this.tS.list().subscribe((data) => {
          this.tS.setList(data);
        });
      });
      this.router.navigate(['telefonos']);
    }
  }
}



