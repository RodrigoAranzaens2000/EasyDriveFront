import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common'; // Importar DatePipe
import { CommonModule } from '@angular/common'; // Importar CommonModule

import { Resenias } from '../../../models/Resenias';
import { ReseniasService } from '../../../services/resenias.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listarresenias',
  standalone: true,
  imports: [
    CommonModule,  // Agregar CommonModule aquí
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    DatePipe, // Añadir DatePipe en imports,
    MatCardModule
  ],
  templateUrl: './listarresenias.component.html',
  styleUrl: './listarresenias.component.css'
})
export class ListarreseniasComponent {
  dataSource: MatTableDataSource<Resenias> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rS: ReseniasService, private snackBar: MatSnackBar) {}

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
        this.snackBar.open('Resenia eliminada exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snack-success']
        });
      },
      error: (err) => {
        if (err.status === 400 && err.error && err.error.error.includes('No se puede eliminar Resenia')) {
          this.snackBar.open('No se puede eliminar Resenia, está siendo utilizado en otras tablas.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        } else {
          this.snackBar.open('Ocurrió un error al eliminar Resenia.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        }
      }
    });
  }
}
