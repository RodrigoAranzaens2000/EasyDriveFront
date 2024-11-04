import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarescuelasComponent } from "./listarescuelas/listarescuelas.component";

@Component({
  selector: 'app-escuelas',
  standalone: true,
  imports: [RouterOutlet, ListarescuelasComponent],
  templateUrl: './escuelas.component.html',
  styleUrl: './escuelas.component.css'
})
export class EscuelasComponent {
constructor(public route:ActivatedRoute){}
}
