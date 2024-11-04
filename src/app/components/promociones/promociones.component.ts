import { Component } from '@angular/core';
import { ListarpromocionesComponent } from "./listarpromociones/listarpromociones.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-promociones',
  standalone: true,
  imports: [RouterOutlet,ListarpromocionesComponent],
  templateUrl: './promociones.component.html',
  styleUrl: './promociones.component.css'
})
export class PromocionesComponent {
  constructor(public route:ActivatedRoute){}
}
