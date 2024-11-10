import { Component } from '@angular/core';
import { ListarreseniasComponent } from './listarresenias/listarresenias.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-resenias',
  standalone: true,
  imports: [ListarreseniasComponent, RouterOutlet],
  templateUrl: './resenias.component.html',
  styleUrl: './resenias.component.css'
})
export class ReseniasComponent {
constructor(public route:ActivatedRoute){}
}
