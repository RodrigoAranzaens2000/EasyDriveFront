import { Component, inject, ViewChild } from '@angular/core';
import { Notificaciones } from '../../../models/Notificaciones';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NotificacionesService } from '../../../services/notificaciones.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar

@Component({
  selector: 'app-listarnotificaciones',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule, MatButtonModule, MatDialogModule],
  templateUrl: './listarnotificaciones.component.html',
  styleUrl: './listarnotificaciones.component.css'
})
export class ListarnotificacionesComponent {
  dataSource: MatTableDataSource<Notificaciones> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4' , 'c5' , 'c6', 'accion01' , 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  readonly snackBar = inject(MatSnackBar); // Inyecta MatSnackBar

  constructor(private nS: NotificacionesService) {}

  ngOnInit(): void {
    this.nS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.nS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number): void {
    this.nS.delete(id).subscribe({
      next: (data) => {
        this.nS.list().subscribe((data) => {
          this.nS.setList(data);
        });
        // Mostrar mensaje de éxito
        this.snackBar.open('Notificacion eliminado exitosamente', 'Cerrar', {
          duration: 3000,  // El mensaje se cierra después de 3 segundos
          panelClass: ['snack-success']
        });
      },
      error: (err) => {
        // Manejar error si no se puede eliminar por clave foránea
        if (err.status === 400 && err.error && err.error.error.includes('No se puede eliminar la notificacion')) {
          this.snackBar.open('No se puede eliminar la notificacion, está siendo utilizado en otras tablas.', 'Cerrar', {
            duration: 5000,  // El mensaje se muestra durante 5 segundos
            panelClass: ['snack-error']
          });
        } else {
          // Otro tipo de error
          this.snackBar.open('Ocurrió un error al eliminar la notificacion', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        }
      }
    });
  }
}
