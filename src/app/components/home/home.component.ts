import { Component } from '@angular/core';
import { MatMonthView } from '@angular/material/datepicker';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [    
    MatToolbarModule,
    MatMenuModule,
    MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
