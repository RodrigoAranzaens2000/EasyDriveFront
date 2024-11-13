import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReservasService } from '../../../services/reservas.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-graficas',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.6s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class GraficasComponent implements OnInit {
  // Dashboard metrics
  totalReservas: number = 0;
  totalEscuelas: number = 0;
  totalCentros: number = 0;
  crecimientoMensual: number = 0;

  // Chart configurations with improved options
  chartBaseOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif"
        }
      }
    }
  };

  // Pie Chart
  barChartOptions: ChartOptions = {
    ...this.chartBaseOptions,
    plugins: {
      ...this.chartBaseOptions.plugins,
      title: {
        display: true,
        text: 'Distribución de Servicios',
        font: {
          size: 16,
          family: "'Inter', sans-serif"
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  // Bar Chart
  barChartOptions1: ChartOptions = {
    ...this.chartBaseOptions,
    indexAxis: 'x',
    plugins: {
      ...this.chartBaseOptions.plugins,
      title: {
        display: true,
        text: 'Reservas por Escuela',
        font: {
          size: 16,
          family: "'Inter', sans-serif"
        }
      }
    }
  };
  barChartLabels1: string[] = [];
  barChartType1: ChartType = 'bar';
  barChartLegend1 = true;
  barChartData1: ChartDataset[] = [];

  // Doughnut Chart
  barChartOptions2: ChartOptions = {
    ...this.chartBaseOptions,
    plugins: {
      ...this.chartBaseOptions.plugins,
      title: {
        display: true,
        text: 'Distribución por Centro',
        font: {
          size: 16,
          family: "'Inter', sans-serif"
        }
      }
    }
  };
  barChartLabels2: string[] = [];
  barChartType2: ChartType = 'doughnut';
  barChartLegend2 = true;
  barChartData2: ChartDataset[] = [];

  // Line Chart
  barChartOptions3: ChartOptions = {
    ...this.chartBaseOptions,
    plugins: {
      ...this.chartBaseOptions.plugins,
      title: {
        display: true,
        text: 'Tendencia de Ganancias',
        font: {
          size: 16,
          family: "'Inter', sans-serif"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  barChartLabels3: string[] = [];
  barChartType3: ChartType = 'line';
  barChartLegend3 = true;
  barChartData3: ChartDataset[] = [];

  // Line Chart
  barChartOptions4: ChartOptions = {
    ...this.chartBaseOptions,
    plugins: {
      ...this.chartBaseOptions.plugins,
      title: {
        display: true,
        text: 'Analisis de servicios',
        font: {
          size: 16,
          family: "'Inter', sans-serif"
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };
  barChartLabels4: string[] = [];
  barChartType4: ChartType = 'line';
  barChartLegend4 = true;
  barChartData4: ChartDataset[] = [];

  constructor(private rS: ReservasService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Grafica 1
    this.rS.getSumaServicios().subscribe((data) => {
      this.barChartLabels = data.map(item => item.nombre);
      this.barChartData = [{
        data: data.map(item => item.sumaReserva),
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'],
        borderColor: 'white',
        borderWidth: 2
      }];
      // Actualizar métricas
      this.totalReservas = data.reduce((acc, curr) => acc + curr.sumaReserva, 0);
    });

    // Grafica 2
    this.rS.getCantidadReservasPorEscuela().subscribe((data) => {
      this.barChartLabels1 = data.map(item => item.nombre);
      this.barChartData1 = [{
        data: data.map(item => item.cantidadReserva),
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1,
        borderRadius: 6
      }];
      this.totalEscuelas = data.length;
    });

    // Grafica 3
    this.rS.getCantidadReservasPorCentro().subscribe((data) => {
      this.barChartLabels2 = data.map(item => item.nombre);
      this.barChartData2 = [{
        data: data.map(item => item.cantidad),
        backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6', '#1abc9c'],
        borderColor: 'white',
        borderWidth: 2
      }];
      this.totalCentros = data.length;
    });

    // Grafica 4
    this.rS.getGananciaPromociones().subscribe((data) => {
      this.barChartLabels3 = data.map(item => item.nombrePromocion);
      this.barChartData3 = [{
        data: data.map(item => item.ganancia),
        label: 'Ganancias',
        fill: true,
        tension: 0.4,
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        borderColor: '#3498db',
        pointBackgroundColor: '#3498db',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3498db',
        borderWidth: 2
      }];

    // Obtener datos de la API para la gráfica
    this.rS.getAnailisisServicios().subscribe((data) => {
      this.barChartLabels4 = data.map(item => item.nombreServicio); // Etiquetas de la gráfica
      this.barChartData4 = [{
        data: data.map(item => item.recaudadoPorServicio), // Datos de la gráfica
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'], // Colores de las secciones
        borderColor: 'white', // Color del borde
        borderWidth: 2 // Grosor del borde
      }];
      
      // Actualizar métricas (total de reservas)
      this.totalReservas = data.reduce((acc, curr) => acc + curr.cantidadServicios, 0); // Total de reservas
    });

        // Calcular crecimiento
        const valores = data.map(item => item.ganancia);
        if (valores.length >= 2) {
          const ultimo = valores[valores.length - 1];
          const penultimo = valores[valores.length - 2];
          this.crecimientoMensual = ((ultimo - penultimo) / penultimo) * 100;
        }
      });
    }
}