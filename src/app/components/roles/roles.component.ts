import { Component } from '@angular/core';
import { ListarolesComponent } from "./listaroles/listaroles.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterOutlet,ListarolesComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  constructor(public route:ActivatedRoute){}
}
