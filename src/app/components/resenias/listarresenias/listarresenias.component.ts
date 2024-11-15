import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { Resenias } from '../../../models/Resenias';
import { ReseniasService } from '../../../services/resenias.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarresenias',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule, MatButtonModule, MatDialogModule],
  templateUrl: './listarresenias.component.html',
  styleUrl: './listarresenias.component.css'
})
export class ListarreseniasComponent {
  dataSource: MatTableDataSource<Resenias> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4' , 'c5' , 'c6', 'c7' , 'accion01' , 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private rS: ReseniasService,  private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number): void {
    this.rS.delete(id).subscribe({
      next: (data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
        // Mostrar mensaje de éxito
        this.snackBar.open('Resenia eliminado exitosamente', 'Cerrar', {
          duration: 3000,  // El mensaje se cierra después de 3 segundos
          panelClass: ['snack-success']
        });
      },
      error: (err) => {
        // Manejar error si no se puede eliminar por clave foránea
        if (err.status === 400 && err.error && err.error.error.includes('No se puede eliminar Resenia')) {
          this.snackBar.open('No se puede eliminar Resenia, está siendo utilizado en otras tablas.', 'Cerrar', {
            duration: 5000,  // El mensaje se muestra durante 5 segundos
            panelClass: ['snack-error']
          });
        } else {
          // Otro tipo de error
          this.snackBar.open('Ocurrió un error al eliminar Resenia.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        }
      }
    });
  }
}
