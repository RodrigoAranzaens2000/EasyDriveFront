import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CalendarioService } from '../../../services/calendario.service';
import { Calendario } from '../../../models/Calendario';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Reservas } from '../../../models/Reservas';

@Component({
  selector: 'app-listarcalendario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarcalendario.component.html',
  styleUrl: './listarcalendario.component.css'
})
export class ListarcalendarioComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<Calendario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2','c3', 'accion01'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private cS: CalendarioService) {}
  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      data.forEach((calendario) => {
        if (!calendario.reserva) {
          calendario.reserva = new Reservas(); // Inicializa `reserva` si no está presente
        }
      });
      this.dataSource = new MatTableDataSource(data);
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
