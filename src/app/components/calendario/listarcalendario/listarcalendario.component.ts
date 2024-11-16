import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CalendarioService } from '../../../services/calendario.service';
import { Calendario } from '../../../models/Calendario';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Reservas } from '../../../models/Reservas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCalendar } from '@angular/material/datepicker';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-listarcalendario',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
    MatCalendar,
    CommonModule,
    DatePipe,
  ],
  templateUrl: './listarcalendario.component.html',
  styleUrls: ['./listarcalendario.component.css'],
})
export class ListarcalendarioComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Calendario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'accion01', 'accion02'];
  filteredEvents: Calendario[] = [];
  selectedDate: Date | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: CalendarioService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      data.forEach((calendario) => {
        if (!calendario.res) {
          calendario.res = new Reservas(); // Inicializa `res` si no está presente
        }
        calendario.fechaSincronizacion = this.adjustToLocalTimezone(
          new Date(calendario.fechaSincronizacion)
        ); // Ajustar la fecha al cargar
      });
      this.dataSource = new MatTableDataSource(data);
      this.filteredEvents = data; // Inicializa la lista de eventos
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // Método para manejar la selección de una fecha en el calendario
  onDateSelected(date: Date): void {
    this.selectedDate = date; // Utiliza directamente la fecha seleccionada
    this.filteredEvents = this.dataSource.data.filter((data) => {
      const eventDate = new Date(data.fechaSincronizacion);
      return eventDate.toDateString() === this.selectedDate?.toDateString();
    });
  }

  // Método para ajustar una fecha a la zona horaria local (usado solo al cargar)
  private adjustToLocalTimezone(date: Date): Date {
    const adjustedDate = new Date(date);
    adjustedDate.setMinutes(
      adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset()
    );
    return adjustedDate;
  }

  // Método para eliminar un calendario
  eliminar(id: number): void {
    this.cS.delete(id).subscribe({
      next: () => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
          this.snackBar.open('Calendario eliminado exitosamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['snack-success'],
          });
        });
      },
      error: (err) => {
        if (
          err.status === 400 &&
          err.error &&
          err.error.error.includes('No se puede eliminar el calendario')
        ) {
          this.snackBar.open(
            'No se puede eliminar el calendario, tiene reservas asociadas.',
            'Cerrar',
            {
              duration: 5000,
              panelClass: ['snack-error'],
            }
          );
        } else {
          this.snackBar.open('Ocurrió un error al eliminar el calendario.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error'],
          });
        }
      },
    });
  }
}
