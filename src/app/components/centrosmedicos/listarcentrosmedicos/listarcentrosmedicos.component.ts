import { CentrosMedicos } from '../../../models/CentrosMedicos';
import { CentrosmedicosService } from '../../../services/centrosmedicos.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importar MatSnackBar

@Component({
  selector: 'app-listarcentrosmedicos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarcentrosmedicos.component.html',
  styleUrl: './listarcentrosmedicos.component.css'
})
export class ListarcentrosmedicosComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<CentrosMedicos> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5' , 'c6', 'accion01', 'accion02'];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private cS: CentrosmedicosService, private snackBar: MatSnackBar) {}  // Inyectamos MatSnackBar

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
      next: (data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
        // Mostrar mensaje de éxito
        this.snackBar.open('Centro médico eliminado exitosamente', 'Cerrar', {
          duration: 3000,  // El mensaje se cierra después de 3 segundos
          panelClass: ['snack-success']
        });
      },
      error: (err) => {
        // Manejar error si no se puede eliminar por clave foránea
        if (err.status === 400 && err.error && err.error.error.includes('No se puede eliminar el centro médico')) {
          this.snackBar.open('No se puede eliminar el centro médico, está siendo utilizado en otras tablas.', 'Cerrar', {
            duration: 5000,  // El mensaje se muestra durante 5 segundos
            panelClass: ['snack-error']
          });
        } else {
          // Otro tipo de error
          this.snackBar.open('Ocurrió un error al eliminar el centro médico.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        }
      }
    });
  }
}
