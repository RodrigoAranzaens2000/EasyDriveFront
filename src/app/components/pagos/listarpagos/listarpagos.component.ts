import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importar MatSnackBar
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarpagos',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule , MatIcon , RouterModule],
  templateUrl: './listarpagos.component.html',
  styleUrl: './listarpagos.component.css'
})
export class ListarpagosComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4' , 'accion01' , 'accion02' ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Pagos> = new MatTableDataSource();
  
  constructor(private pS: PagosService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
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
        this.snackBar.open('Pago eliminado exitosamente', 'Cerrar', {
          duration: 3000,  // El mensaje se cierra después de 3 segundos
          panelClass: ['snack-success']
        });
      },
      error: (err) => {
        // Manejar error si no se puede eliminar por clave foránea
        if (err.status === 400 && err.error && err.error.error.includes('No se puede eliminar el pago')) {
          this.snackBar.open('No se puede eliminar el pago, está siendo utilizado en otras tablas.', 'Cerrar', {
            duration: 5000,  // El mensaje se muestra durante 5 segundos
            panelClass: ['snack-error']
          });
        } else {
          // Otro tipo de error
          this.snackBar.open('Ocurrió un error al eliminar el cpago.', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-error']
          });
        }
      }
    });
  }
}

