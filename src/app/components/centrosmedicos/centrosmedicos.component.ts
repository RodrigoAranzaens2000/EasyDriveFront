import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcentrosmedicosComponent } from './listarcentrosmedicos/listarcentrosmedicos.component';

@Component({
  selector: 'app-centrosmedicos',
  standalone: true,
  imports: [RouterOutlet,ListarcentrosmedicosComponent],
  templateUrl: './centrosmedicos.component.html',
  styleUrl: './centrosmedicos.component.css'
})
export class CentrosmedicosComponent {
  constructor(public route:ActivatedRoute){}
}
