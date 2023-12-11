import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart, LinearScale, Title, Tooltip, Legend, PointElement, LineController, LineElement, ScatterController,  } from 'chart.js';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.elementRef.nativeElement.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      Chart.register(
        LinearScale,
        Title,
        Tooltip,
        Legend,
        ScatterController,
        PointElement
      );

      var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Java',
            data: [
              { x: '2018', y: 20 },
              { x: '2019', y: 18 },
              { x: '2020', y: 19 },
              { x: '2021', y: 18 },
              { x: '2022', y: 17 },
              { x: '2023', y: 20 },
            ],
            backgroundColor: "#0196FD",
            borderColor: "#0196FD",
            borderWidth: 1
          },
          {
            label: 'Python',
            data: [
              { x: '2018', y: 16 },
              { x: '2019', y: 17 },
              { x: '2020', y: 18 },
              { x: '2021', y: 18 },
              { x: '2022', y: 20 },
              { x: '2023', y: 23 },
            ],
            backgroundColor: "#FFAF00",
            borderColor: "#FFAF00",
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              type: 'linear',
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Utilisation du Java et Python'
            },
            tooltip: {
              mode: 'point',
              intersect: true,
            },
            legend: {
              position: 'bottom',
            }
          }
        }
      });
    }
  }
}
