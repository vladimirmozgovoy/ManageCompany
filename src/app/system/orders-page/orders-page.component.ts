
import { Component,OnInit, HostListener} from '@angular/core';
import { MdbTableService } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'yh-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})


export class OrdersPageComponent {
  с:any;
  d:any;
  searchRes:any;
  cdata:any;
//Параметры
from:Date;
to:Date;
resDate:Date;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
 panelOpenState = false;
  url:any;
  elements: any  ;
  test: any;
  headElements = ['№обр', 'Дата', 'Услуга', 'Адрес','Тема обращения','Статус'];
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
 
 //Возращает данные даты от
  
 
 
 //Возращает данные даты до и отправляет на массив на сервер
  

  constructor(private http: HttpClient,private tableService: 
    MdbTableService,private router:Router,private cookieService: CookieService) {
    // Получаем Cookies
    this.token =this.cookieService.get('token');
    
    this.ccid =this.cookieService.get('ccid');

    this.url="http://cc20821.tmweb.ru/api/get_orders.php?ccid="+this.ccid;
//this.url="http://tvoydom24.com/api5/get_orders.php?ccid="+this.ccid;
    
     this.http.get(this.url).subscribe((response)=>{
      this.response=response;
      this.elements=this.response.orders;
   
  
      
   
    
    });



    
    
    
    
    
    
  
   }

   getOrder(){
    this.url="http://cc20821.tmweb.ru/api/get_orders.php?ccid="+this.ccid;
    
    this.http.get(this.url).subscribe((response)=>{
     this.response=response;
     this.elements=this.response.orders;
  
 
     
  
   
   });
  }
   getFrom(from:MatDatepickerInputEvent<Date>) {
    this.from=from.value;
    let d=0;
  
  if(this.to){
    this.elements=[];
 
   for(let i in this.response.orders){
     if(new Date(this.response.orders[i].date)<this.to && new Date(this.response.orders[i].date)>this.from){
      this.elements[d] = { 
        "date":this.response.orders[i].date,
        "shid":this.response.orders[i].shid,
        "address":this.response.orders[i].address,
      "category":this.response.orders[i].category,
      "msg":this.response.orders[i].msg,
      "name":this.response.orders[i].name,
      "phone":this.response.orders[i].phone,
      "serviceName":this.response.orders[i].serviceName,
      "status":this.response.orders[i].status,
     "user_name":this.response.orders[i].user_name, "user_phone":this.response.orders[i].user_phone, "value":this.response.orders[i].value};
     d++;
     }
    }
   

  }
    
  
  }

  getTo(to:MatDatepickerInputEvent<Date>) {

    this.to=to.value;
       
    let d=0;
  
    if(this.from){
      this.elements=[];
   
      for(let i in this.response.orders){
        if(new Date(this.response.orders[i].date)<this.to && new Date(this.response.orders[i].date)>this.from){
         this.elements[d] = { 
           "date":this.response.orders[i].date,
           "shid":this.response.orders[i].shid,
           "address":this.response.orders[i].address,
         "category":this.response.orders[i].category,
         "msg":this.response.orders[i].msg,
         "name":this.response.orders[i].name,
         "phone":this.response.orders[i].phone,
         "serviceName":this.response.orders[i].serviceName,
         "status":this.response.orders[i].status,
        "user_name":this.response.orders[i].user_name, "user_phone":this.response.orders[i].user_phone, "value":this.response.orders[i].value};
        d++;
        }
       }
     
  
    }
      
      }

      work(shid){

        this.url="http://cc20821.tmweb.ru/api/edit_status_appeal.php";
       //this.url="http://tvoydom/edit_status_appeal.php";
          const fd =new FormData();
      
          fd.append('shid',shid);
          fd.append('status',"working");
         
          this.http.post(this.url,fd).subscribe(res=>{
            console.log(res);
            
           if(res==200){
            this.getOrder();
        
           }
        
          });
       
      }


      done(shid){
   
        this.url="http://cc20821.tmweb.ru/api/edit_status_appeal.php";
       //this.url="http://tvoydom/edit_status_appeal.php";
          const fd =new FormData();
         
       
          fd.append('shid',shid);
          fd.append('status',"done");
         
          this.http.post(this.url,fd).subscribe(res=>{
            console.log(res);
            
           if(res==200){
            this.getOrder();
        
           }
        
          });
    
      }



//Возращает данные поля поиска и отправляет массив с поиском на сервер
@HostListener('input') oninput() {
  this.searchText=this.searchText.toLowerCase();
  this.d=0;
  this.searchRes=[];
  if(this.searchText !=""){
    this.cdata=this.response.orders;
    for(let i in this.cdata ){
      if(this.cdata[i].shid.toLowerCase().indexOf(this.searchText)!=-1 
      || this.cdata[i].date.toLowerCase().indexOf(this.searchText)!=-1
       || this.cdata[i].serviceName.toLowerCase().indexOf(this.searchText)!=-1 
       || this.cdata[i].address.toLowerCase().indexOf(this.searchText)!=-1
       || this.cdata[i].msg.toLowerCase().indexOf(this.searchText)!=-1
       || this.cdata[i].status.toLowerCase().indexOf(this.searchText)!=-1
       || this.cdata[i].user_name.toLowerCase().indexOf(this.searchText)!=-1
       || this.cdata[i].user_phone.toLowerCase().indexOf(this.searchText)!=-1
      )
          {
            this.searchRes[this.d] = {  
              "date":this.response.orders[i].date,
            "shid":this.response.orders[i].shid,
            "address":this.response.orders[i].address,
            "category":this.response.orders[i].category,
            "msg":this.response.orders[i].msg,
            "name":this.response.orders[i].name,
            "phone":this.response.orders[i].phone,
            "serviceName":this.response.orders[i].serviceName,
            "status":this.response.orders[i].status,
            "user_name":this.response.orders[i].user_name,
             "user_phone":this.response.orders[i].user_phone, 
             "value":this.response.orders[i].value}



          this.d++
          }
this.elements=this.searchRes;
    }
  
  }




}
 

 
   
 

 
 
 
   
 

 
 


 
 

 

 

  
  
  
  

  
  
  ngOnInit() {
    this.dropdownList = [
      { item_id: 'working', item_text: 'В работе' },
      { item_id: 'done', item_text: 'Выполнен' },
      { item_id: 'new', item_text: 'Новый' },
   
    ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Сброс',
      
      
     
    };
  }

//Отправляет даные типы заказов на сервер 

onItemSelect(item: any) {
  let c=0;
  this.searchRes=this.response.orders;
  this.elements=[];
  
 

  
 
 
  



  for(let i in this.searchRes ){
    for(let j in this.selectedItems){
    
    
      
      if(this.response.orders[i].status ==this.selectedItems[j].item_text){
        this.elements[c] = { "date":this.response.orders[i].date,
        "shid":this.response.orders[i].shid,
        "address":this.response.orders[i].address,
        "category":this.response.orders[i].category,
        "msg":this.response.orders[i].msg,
        "name":this.response.orders[i].name,
        "phone":this.response.orders[i].phone,
        "serviceName":this.response.orders[i].serviceName,
        "status":this.response.orders[i].status,
        "user_name":this.response.orders[i].user_name, "user_phone":this.response.orders[i].user_phone, "value":this.response.orders[i].value};
     c++;
      }
      
     
    }}
 

 
  }


  onSelectAll(items: any) {
    this.elements=this.response.orders;
   
  
    
  
  }
  onDeSelect(item:any){
    if(this.selectedItems.length!=0){


      let c=0;
      this.searchRes=this.response.orders;
      this.elements=[];
      
    
      for(let i in this.searchRes ){
        for(let j in this.selectedItems){
        
        
          
          if(this.searchRes[i].type ==this.selectedItems[j].item_text){
            this.elements[c] = { "address":this.searchRes[i].address,"date":this.searchRes[i].date,
            "type":this.searchRes[i].type,
           "user_name":this.searchRes[i].user_name, "user_phone":this.searchRes[i].user_phone, "value":this.searchRes[i].value};
         c++;
          }
          
         
        }
      }


    }
    else{
      this.elements=this.response.orders;
    }
    
  }












}
