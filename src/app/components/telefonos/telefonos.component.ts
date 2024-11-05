import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartelefonosComponent } from './listartelefonos/listartelefonos.component';

@Component({
  selector: 'app-telefonos',
  standalone: true,
  imports: [RouterOutlet , ListartelefonosComponent],
  templateUrl: './telefonos.component.html',
  styleUrl: './telefonos.component.css'
})
export class TelefonosComponent {
  constructor(public route: ActivatedRoute) {}
}
