import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CalendarioService } from '../../../services/calendario.service';
import { Calendario } from '../../../models/Calendario';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Reservas } from '../../../models/Reservas';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importar MatSnackBar

@Component({
  selector: 'app-listarcalendario',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarcalendario.component.html',
  styleUrl: './listarcalendario.component.css'
})
export class ListarcalendarioComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Calendario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'accion01' , 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private cS: CalendarioService, private snackBar: MatSnackBar) {}  // Inyectamos MatSnackBar

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      data.forEach((calendario) => {
        if (!calendario.res) {
          calendario.res = new Reservas(); // Inicializa `reserva` si no está presente
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

  eliminar(id: number): void {
    this.cS.delete(id).subscribe({
      next: (data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
        // Mostrar mensaje de éxito
        this.snackBar.open('Calendario eliminado exitosamente', 'Cerrar', {
          duration: 3000,  // El mensaje se cierra después de 3 segundos
          panelClass: ['snack-success']
        });
      },
      error: (err) => {
        // Manejar error si no se puede eliminar por clave foránea (por ejemplo, tiene reservas asociadas)
        if (err.status === 400 && err.error && err.error.error.includes('No se puede eliminar el calendario')) {
          this.snackBar.open('No se puede eliminar el calendario, tiene reservas asociadas.', 'Cerrar', {
            duration: 5000,  // El mensaje se muestra durante 5 segundos
            panelClass: ['snack-error']
          });
        } else {
          // Otro tipo de error
          this.snackBar.open('Ocurrió un error al eliminar el calendario.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        }
      }
    });
  }
}
