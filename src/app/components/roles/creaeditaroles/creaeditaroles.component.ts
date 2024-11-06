import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Usuarios } from '../../../models/Usuarios';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';
import { UsuariosService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaeditaroles',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './creaeditaroles.component.html',
  styleUrl: './creaeditaroles.component.css',
})
export class CreaeditarolesComponent implements OnInit {
  form: FormGroup;
  listaUsuarios: Usuarios[] = [];
  roles: Roles = new Roles();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolesService,
    private uS: UsuariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      hrol: ['', Validators.required],
      hcodigo: [''],
      huser: ['', Validators.required],
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
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }

  aceptar() : void {
    if (this.form.valid) {
      this.roles.id = this.form.value.hcodigo;
      this.roles.rol = this.form.value.hrol;
      this.roles.user = this.form.value.huser;

      this.rS.insert(this.roles).subscribe(() => {
        this.listaRoles();
      });
      this.router.navigate(['roles']);
    }
  }

  
  private listaRoles() {
    this.rS.list().subscribe((data) => {
      this.rS.setList(data);
      this.router.navigate(['roles']);
    });
  }
  
  private init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        hcodigo: data.id,
        hrol: data.rol,
        huser: data.user,
      });
    });
  }
}
