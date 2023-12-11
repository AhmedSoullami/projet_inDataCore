
import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart, DoughnutController, ArcElement } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.elementRef.nativeElement.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
      Chart.register(DoughnutController, ArcElement);

      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Java', 'Python'],
          datasets: [{
            data: [120, 75],
            backgroundColor: ["#0196FD", "#FFAF00"],
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Répartition de l\'utilisation entre Java et Python'
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
