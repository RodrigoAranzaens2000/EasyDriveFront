import { CommonModule } from '@angular/common'; // Importar CommonModule
import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'; // Importar MatCardModule
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarcentrosmedicos',
  standalone: true,
  imports: [
    CommonModule, // Agregar CommonModule
    MatCardModule, // Agregar MatCardModule
    MatIconModule,
    MatPaginatorModule,
    RouterModule
  ],
  templateUrl: './listarcentrosmedicos.component.html',
  styleUrls: ['./listarcentrosmedicos.component.css']
})
export class ListarcentrosmedicosComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<CentrosMedicos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS: CentrosmedicosService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number): void {
    this.cS.delete(id).subscribe({
      next: () => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
        this.snackBar.open('Centro médico eliminado exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snack-success']
        });
      },
      error: (err) => {
        if (err.status === 400 && err.error?.error?.includes('No se puede eliminar el centro médico')) {
          this.snackBar.open('No se puede eliminar el centro médico, está siendo utilizado en otras tablas.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        } else {
          this.snackBar.open('Ocurrió un error al eliminar el centro médico.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        }
      }
    });
  }
}
