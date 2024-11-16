import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Reservas } from '../../../models/Reservas';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ReservasService } from '../../../services/reservas.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarreservas',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarreservas.component.html',
  styleUrl: './listarreservas.component.css'
})
export class ListarreservasComponent {
  dataSource: MatTableDataSource<Reservas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4' , 'c5' , 'c6' , 'c7', 'c8' ,  'accion01' , 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private rS: ReservasService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  eliminar(id: number): void {
    this.rS.delete(id).subscribe({
      next: () => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
        this.snackBar.open('Reserva eliminada exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snack-success']
        });
      },
      error: (err) => {
        if (err.status === 400 && err.error?.error?.includes('No se puede eliminar Reserva')) {
          this.snackBar.open('No se puede eliminar Reserva, está siendo utilizado en otras tablas.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        } else {
          this.snackBar.open('Ocurrió un error al eliminar Reserva.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        }
      }
    });
  }
}
