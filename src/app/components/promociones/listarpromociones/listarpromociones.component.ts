import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Promocion } from '../../../models/Promocion';
import { PromocionesService } from '../../../services/promociones.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarpromociones',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarpromociones.component.html',
  styleUrl: './listarpromociones.component.css'
})
export class ListarpromocionesComponent {
  dataSource: MatTableDataSource<Promocion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private pS: PromocionesService , private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number): void {
    this.pS.delete(id).subscribe({
      next: (data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
        // Mostrar mensaje de éxito
        this.snackBar.open('Promocion eliminado exitosamente', 'Cerrar', {
          duration: 3000,  // El mensaje se cierra después de 3 segundos
          panelClass: ['snack-success']
        });
      },
      error: (err) => {
        // Manejar error si no se puede eliminar por clave foránea
        if (err.status === 400 && err.error && err.error.error.includes('No se puede eliminar Promocion')) {
          this.snackBar.open('No se puede eliminar Promocion, está siendo utilizado en otras tablas.', 'Cerrar', {
            duration: 5000,  // El mensaje se muestra durante 5 segundos
            panelClass: ['snack-error']
          });
        } else {
          // Otro tipo de error
          this.snackBar.open('Ocurrió un error al eliminar Promocion.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        }
      }
    });
  }
}
