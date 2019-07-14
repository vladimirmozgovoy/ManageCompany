import { Component,OnInit, HostListener} from '@angular/core';
import { MdbTableService } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'yh-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.scss']
})

export class PaymentsPageComponent implements OnInit {
 // Свойства элементов
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

 panelOpenState = false;
  url:any;
  elements: any  ;
  test: any;
  headElements = ['Лиц.счет', 'Дата', 'Город', 'Счетчики','Сумма'];
  response:any ;
  post:any;
payments:any;
  searchText: string = '';
  previous: string;
  fromDate:any;
  toDate:any;
  monthFrom: any;
  monthTo: any;
  token:any;
  ccid:any;
  
  
  //Возращает данные от датЫ
  getFrom(from:MatDatepickerInputEvent<Date>) {
    this.monthFrom = Number(from.value.getMonth())+1;
    this.fromDate = from.value.getFullYear()+'-'+this.monthFrom+'-'+from.value.getDate();
    
  
  }
  //Возращает данные до и отправляет массив на сервер
  getTo(to:MatDatepickerInputEvent<Date>) {
    this.monthTo=Number(to.value.getMonth())+1;
    this.toDate=to.value.getFullYear()+'-'+this.monthTo+'-'+to.value.getDate();
  console.log(this.toDate);
  if(this.fromDate){
    
    
    this.url="http://cc20821.tmweb.ru/api/get_payments.php";
    //this.url="http://www.tvoydom24.com/api/get_payments.php";
    const body = {from:this.fromDate,to:this.toDate};
     this.http.post(this.url,body).subscribe((response)=>{
      this.response=response;
      this.elements=this.response.payments;
  
    
    })
  }
  
  }

  constructor(private http: HttpClient,private tableService: MdbTableService,private router:Router,private cookieService: CookieService) {
    // Получаем Cookies
    
    this.token =this.cookieService.get('token');
    
    this.ccid =this.cookieService.get('ccid');
    // Проверка на вход
    if(this.token ==200){
console.log(this.cookieService.get('ccid'));



/*

Параметр this.token был создан для тестовой проверки пользователя , на то что он авторизовался или нет в системе 

( еще не доработан)





*/




//Получение платежей с помощью метода POST
this.url="http://cc20821.tmweb.ru/api/get_payments.php";
//this.url="http://www.tvoydom24.com/api5/get_payments.php";
    const body = {token:this.token,ccid:this.ccid};
     this.http.post(this.url,body).subscribe((response)=>{
      this.response=response;
      this.elements=this.response.payments;
 
    
    })
}
    
    else{
      this.router.navigate(['/login']);
    }
      
      

      
      
      
     
    
    
    
  
   }
//Возращает текст поиска и отправляет на сервер
  @HostListener('input') oninput() {
    if(this.searchText !=""){
      this.url="http://cc20821.tmweb.ru/api/get_payments.php";
   
    const body = {search:this.searchText,token:this.token,ccid:this.ccid};
   
    this.http.post(this.url,body).subscribe((response)=>{
      this.response=response;
      this.elements=this.response.payments;
     
    })
    }
    
    
    
  }
//Свойства типа счетчика
  ngOnInit() {
    this.dropdownList = [
      { item_id: 'gas', item_text: 'Газ' },
      { item_id: 'electricity', item_text: 'Электричество' },
      { item_id: 'heating', item_text: 'Отопление' },
      { item_id: 'hot_water', item_text: 'Горячая вода' },
      { item_id: 'cold_water', item_text: 'Холодная вода' },
    ];
    
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      
      
     
    };
  }
  //Возращает данные тип счетчика и отравляет на сервер
  onItemSelect(item: any) {
    const body = {type:item.item_id,token:this.token,ccid:this.ccid};
     this.http.post(this.url,body).subscribe((response)=>{
      this.response=response;
      this.elements=this.response.payments;
   
    
    })
  }
  
  



    

    }

    

    
    
  

  





  
