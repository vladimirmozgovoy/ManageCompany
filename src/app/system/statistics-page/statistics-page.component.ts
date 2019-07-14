import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'yh-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
/* Статистика */

export class StatisticsPageComponent  {

  //Свойства графиков
elements:any; 
url:any;
response:any;
  
  public barType: string = 'bar';


  public barDatasets: Array<any> = [
    { data: [0, 0, 0, 2000, 0, 0, 0 ,0, 0, 0, 0, 3000], label: 'RUB' }
  ];

  public barLabels: Array<any> = ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь','Июль','Авуст','Cентябрь', 'Октябрь','Ноябрь','Декарбь',];

  public barColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 2,
    }
  ];

  public barOptions: any = {
    responsive: true
  };
  public barClicked(e: any): void { }
  public barHovered(e: any): void { }







  public pType: string = 'bar';


  public pDatasets: Array<any> = [
    { data: [0, 0, 0, 2000, 0, 0, 0 ,0, 0, 0, 0, 3000], label: 'RUB' }
  ];

  public pLabels: Array<any> = ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь','Июль','Авуст','Cентябрь', 'Октябрь','Ноябрь','Декарбь',];

  public pColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 2,
    }
  ];

  public pOptions: any = {
    responsive: true
  };
  public pClicked(e: any): void { }
  public pHovered(e: any): void { }


  public sType: string = 'bar';


  public sDatasets: Array<any> = [
    { data: [0, 0, 0, 2000, 0, 0, 0 ,0, 0, 0, 0, 3000], label: 'RUB' }
  ];

  public sLabels: Array<any> = ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь','Июль','Авуст','Cентябрь', 'Октябрь','Ноябрь','Декарбь',];

  public sColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 2,
    }
  ];

  public sOptions: any = {
    responsive: true
  };
  public sClicked(e: any): void { }
  public sHovered(e: any): void { }

























  public chartType: string = 'doughnut';

  public chartDatasets: Array<any> = [
    { data: [300, 50], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Количество квартир', 'Количество пользователей'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [ '#46BFBD',  '#4D5360'],
      hoverBackgroundColor: [ '#5AD3D1', '#616774'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }





  public perType: string = 'line';

  public perDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40,80, 81, 56, 55, 40], label: 'Человек' },
    
  ];

  public perLabels: Array<any> = ['Январь', 'Ферваль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

  public perColors: Array<any> = [
    {
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
    },
    
  ];

  public perOptions: any = {
    responsive: true
  };
  public perClicked(e: any): void { }
  public perHovered(e: any): void { }
   

  
  constructor(public http: HttpClient){
    //http://cc20821.tmweb.ru

    this.url="http://cc20821.tmweb.ru/api/stat.php";
//this.url="http://tvoydom24.com/api5/stat.php";


     this.http.get(this.url).subscribe((response)=>{

      this.response=response;
      this.elements=this.response.service[0];
      console.log(this.response.qpay[0][1]);
      this.barDatasets=[{data:[this.response.sum_payments[0][1]] , label: 'RUB'}];
      this.pDatasets=[{data:[this.response.qpay[0][1]] , label: 'Платежей'}];
      this.sDatasets=[{data:[this.response.qservice[0][1]] , label: 'Услуг'}];
      this.perDatasets=[{data:[this.response.qusers[0][1]] , label: 'Человек'}];
      for (let i = 1; i <= 12; i++) {
        
        this.barDatasets[0].data[i]=this.response.sum_payments[0][i];
        this.pDatasets[0].data[i]=this.response.qpay[0][i];
        this.sDatasets[0].data[i]=this.response.qservice[0][i];
this.perDatasets[0].data[i]=this.response.qusers[0][i];
      }
    this.chartDatasets=[{data:[this.response.per_users[0][1],this.response.per_users[0][2]] , label: 'RUB'}];
    
    
    });
     
 
  
    
  }
  
  
  

  






}
