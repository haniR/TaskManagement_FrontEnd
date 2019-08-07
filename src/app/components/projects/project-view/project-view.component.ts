import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  constructor(private taskService: TasksService, private route: ActivatedRoute) { }
  title = 'taskmanagement-frontend';
  PieChart:any=[];
  myLabel = []
  myValue = []
  myLabel2 = []
  myValue2 = []
  myLabel3 = []
  myValue3 = []
  loggedIn: any
  projectId: number
  statusChart = []
  priorityChart = []
  typeChart = []
  ngOnInit() {
    this.projectId = this.route.snapshot.params['id']
    console.log(this.projectId)
    this.taskService.projectCharts(this.projectId).then((data: any) => {
      this.statusChart = data.data
      for (let status of this.statusChart) {
        this.myLabel.push(status.name)
        this.myValue.push(status.counter)

      }
      console.log("<<<<<<<<status>>>>>")
      console.log(this.myLabel)
      console.log(this.myValue)
      this.taskService.projectCharts(this.projectId).then((data2: any) => {
        this.priorityChart = data2.data2
        for (let priority of this.priorityChart) {
          this.myLabel2.push(priority.name)
          this.myValue2.push(priority.counter)

        }
        console.log("<<<<<<<<project>>>>>")
        console.log(this.myLabel2)
        console.log(this.myValue2)
        this.taskService.projectCharts(this.projectId).then((data: any) => {
          this.typeChart = data.data3
          for (let type of this.typeChart) {
            this.myLabel3.push(type.name)
            this.myValue3.push(type.counter)
          }
          console.log("<<<<<<<<priority>>>>>")
          console.log(this.myLabel3)
          console.log(this.myValue3)

        })
      })
    })
  }
  public pieChartOptions: ChartOptions = {


    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }, title: {
      text: 'Your Tasks Status',
      display: true
    }
  };

  public pieChartLabels: Label[] = this.myLabel
  public pieChartData: number[] = this.myValue
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  /****************************************************** */
  public pieChartOptions2: ChartOptions = {


    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }, title: {
      text: 'Your Tasks Type',
      display: true
    }
  };

  public pieChartLabels2: Label[] = this.myLabel2
  public pieChartData2: number[] = this.myValue2
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartColors2 = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
/****************************************************** */
public pieChartOptions3: ChartOptions = {


  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
        
      },
    },
  }
  , title: {
    text: 'Your Tasks Priority',
    display: true
  }
};

public pieChartLabels3: Label[] = this.myLabel3
public pieChartData3: number[] = this.myValue3
public pieChartType3: ChartType = 'pie';
public pieChartLegend3 = true;
public pieChartColors3 = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  },
];
  

}
