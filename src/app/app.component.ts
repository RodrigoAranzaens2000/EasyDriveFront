import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { CentrosmedicosComponent } from "./components/centrosmedicos/centrosmedicos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ServiciosComponent, CentrosmedicosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EasyDriveFront';
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }  
}
