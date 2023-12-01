import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { ReservacionService } from 'src/app/services/reservacion.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-reporteschart',
  templateUrl: './reporteschart.page.html',
  styleUrls: ['./reporteschart.page.scss'],
})
export class ReporteschartPage implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsDona: Partial<ChartOptions>;
  cantEstu: number = 1;
  cantBiblio: number = 2;
  

  constructor(private reserva_service: ReservacionService) {

  

    this.chartOptionsDona = {
      series: [2, 3, 3],
      chart: {
        width: 380,
        type: "donut"
      },
      labels: ["Libros", "Tesis", "Revistas"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptions = {
      series: [2, 3],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Estudiante", "Bibliotecario"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    reserva_service.obtenerCantidaReporte().subscribe(
      (data: any) => {
        this.chartOptions.series = [data.cantEstudiantes, data.cantBibliotecarios];
      }

    );

    reserva_service.obtenerCantidaCategoria().subscribe(
      (data: any) => {
        this.chartOptionsDona.series = [data.libros, data.tesis, data.revistas];
      }

    );


   
    
    
  }
  

  ngOnInit() {
  }

}
