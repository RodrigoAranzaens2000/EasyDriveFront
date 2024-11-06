import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarreservasComponent } from './listarreservas/listarreservas.component';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [RouterOutlet , ListarreservasComponent],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
  constructor(public route:ActivatedRoute){}
}
