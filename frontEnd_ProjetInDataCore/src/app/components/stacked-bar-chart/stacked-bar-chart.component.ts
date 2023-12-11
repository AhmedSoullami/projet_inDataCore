import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart, LinearScale, CategoryScale, Title, Tooltip, Legend, BarController, BarElement, ArcElement } from 'chart.js';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css']
})
export class StackedBarChartComponent implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.elementRef.nativeElement.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      Chart.register(
        LinearScale,
        CategoryScale,
        Title,
        Tooltip,
        Legend,
        BarController,
        BarElement,
        ArcElement
      );

      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
          datasets: [{
            label: 'Java',
            data: [20, 18, 19, 18, 17, 20,20],
            backgroundColor: "#0196FD",
            borderColor: "#0196FD",
            borderWidth: 1
          },
          {
            label: 'Python',
            data: [16, 17, 18, 18, 20, 23],
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
              mode: 'index',
              intersect: false,
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
