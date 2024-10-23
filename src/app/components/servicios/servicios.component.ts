import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarserviciosComponent } from "./listarservicios/listarservicios.component";

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterOutlet, ListarserviciosComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  constructor(public route:ActivatedRoute){}
}
