import { Component } from '@angular/core';
import { ListarcalendarioComponent } from "./listarcalendario/listarcalendario.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [RouterOutlet,ListarcalendarioComponent],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css'
})
export class CalendarioComponent {
 constructor(public route:ActivatedRoute){}
}
