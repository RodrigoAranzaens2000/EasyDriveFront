import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Servicios } from '../../../models/Servicios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listarservicios',
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule],
  templateUrl: './listarservicios.component.html',
  styleUrls: ['./listarservicios.component.css'] 
})
export class ListarserviciosComponent implements OnInit, AfterViewInit {
  items: Servicios[] = [];
  @ViewChild('serviceList') serviceList!: ElementRef; // Referencia al contenedor

  constructor(private sS: ServiciosService) {}

  ngOnInit(): void {
    this.getAllItems(); // Cargar todos los elementos al iniciar
  }

  getAllItems(): void {
    this.sS.list().subscribe(
      (data) => {
        this.items = data;
        console.log('items obtenidos', this.items);
      },
      (error) => {
        console.error('error al obtener items', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.initializeScroll(); // Inicializar la funcionalidad de desplazamiento
  }

  initializeScroll(): void {
    const slider = this.serviceList.nativeElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    slider.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 3; // Ajusta la velocidad del desplazamiento
      slider.scrollLeft = scrollLeft - walk;
    });
  }
}

