import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarpagosComponent } from './listarpagos/listarpagos.component';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [RouterOutlet,ListarpagosComponent],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent {
constructor( public route:ActivatedRoute){}
}
