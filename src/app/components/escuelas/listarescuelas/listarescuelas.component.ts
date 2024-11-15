import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Escuelas } from '../../../models/Escuelas';
import { EscuelasService } from '../../../services/escuelas.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar

@Component({
  selector: 'app-listarescuelas',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule, MatPaginatorModule],
  templateUrl: './listarescuelas.component.html',
  styleUrl: './listarescuelas.component.css'
})
export class ListarescuelasComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Escuelas> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4' , 'c5' , 'c6' , 'accion01' , 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(
    private eS: EscuelasService,
    private snackBar: MatSnackBar // Inyecta el MatSnackBar
  ) {}

  ngOnInit(): void {
    this.eS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.eS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number): void {
    this.eS.delete(id).subscribe(
      (response) => {
        // Si la eliminación es exitosa, actualiza la lista
        this.eS.list().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
        });
        this.snackBar.open('Escuela eliminada correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['snack-success']
        });
      },
      (error) => {
        // Si ocurre un error (por ejemplo, violación de llave foránea), muestra el mensaje de error
        this.snackBar.open('No se puede eliminar, la escuela está en uso en otra tabla.', 'Cerrar', {
          duration: 5000,
          panelClass: ['snack-error']
        });
      }
    );
  }
}
