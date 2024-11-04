import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardireccionesComponent } from './listardirecciones/listardirecciones.component';

@Component({
  selector: 'app-direcciones',
  standalone: true,
  imports: [RouterOutlet,ListardireccionesComponent],
  templateUrl: './direcciones.component.html',
  styleUrl: './direcciones.component.css'
})
export class DireccionesComponent {
  constructor(public route:ActivatedRoute){}
}
