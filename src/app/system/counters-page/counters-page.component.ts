import { Component,OnInit, HostListener,ViewChild} from '@angular/core';
import { MdbTableService } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'yh-counters-page',
  templateUrl: './counters-page.component.html',
  styleUrls: ['./counters-page.component.scss']
})


export class CountersPageComponent implements OnInit {
 
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  
  
  
 
test:any;
  from:Date;
  to:Date;
  resDate:Date;
  c:any=0;
  m:any=0;
  counters:any=0;
  d:any=0;
  searchRes:Object=[];
  cdata:any;
 panelOpenState = false;
 token:any;
 ccid:any; 
 url:any;
  elements: any  ;
 
  headElements = ['Лиц.счет', 'Дата', 'Город', 'Тип счетчика','Показания'];
  response:any ;
  post:any;
payments:any;
  searchText: string = '';
  previous: string;
  fromDate:any;
  toDate:any;
  monthFrom: any;
  monthTo: any;

 

  getFrom(from:MatDatepickerInputEvent<Date>) {
    
    this.from=from.value;
    let d=0;
  
  if(this.to){
    this.elements=[];
 
   for(let i in this.response.counters_data){
     if(new Date(this.response.counters_data[i].date)<this.to && new Date(this.response.counters_data[i].date)>this.from){
      this.elements[d] = { "address":this.response.counters_data[i].address,"date":this.response.counters_data[i].date,
      "type":this.response.counters_data[i].type,
     "user_name":this.response.counters_data[i].user_name, "user_phone":this.response.counters_data[i].user_phone, "value":this.response.counters_data[i].value};
     d++;
     }
    }
   

  }
   



  
  }
 

  constructor(private http: HttpClient,private tableService: 
    MdbTableService,private cookieService: CookieService) {
   
    this.token =this.cookieService.get('token');
    this.ccid =this.cookieService.get('ccid');
    
    this.url="http://cc20821.tmweb.ru/api/counters_list.php?ccid="+this.ccid;
    
    //http://cc20821.tmweb.ru
    //this.url="http://www.tvoydom24.com/api5/counters_list.php?ccid="+this.ccid;
    //this.url="http://tvoydom/counters_list.php?ccid="+this.ccid;
    this.http.get(this.url)
    .subscribe((response)=>{
      this.response=response;
      this.elements=this.response.counters_data;
     console.log(Object.values(this.response));
     
  
     

    
    
      
     
    })
    
    
  
   }
 

   getTo(to:MatDatepickerInputEvent<Date>) {

this.to=to.value;
   
    let d=0;
  
  if(this.from){
    this.elements=[];
 
   for(let i in this.response.counters_data){
     if(new Date(this.response.counters_data[i].date)<this.to && new Date(this.response.counters_data[i].date)>this.from){
      this.elements[d] = { "address":this.response.counters_data[i].address,"date":this.response.counters_data[i].date,
      "type":this.response.counters_data[i].type,
     "user_name":this.response.counters_data[i].user_name, 
     "user_lastname":this.response.counters_data[i].user_lastname,
     "user_phone":this.response.counters_data[i].user_phone, "value":this.response.counters_data[i].value};
     d++;
     }
    }
   

  }
  
  }

  @HostListener('input') oninput() {





    this.cdata=this.response.counters_data;
this.searchText=this.searchText.toLocaleLowerCase();
    let d=0;
    this.elements=[]
    if(this.searchText !=""){
      
   
  
   
   for(let i in this.cdata ){
    if(this.cdata[i].address.toLowerCase().indexOf(this.searchText)!=-1 
    || this.cdata[i].value.indexOf(this.searchText)!=-1
     || this.cdata[i].type.toLowerCase().indexOf(this.searchText)!=-1 
     || this.cdata[i].date.indexOf(this.searchText)!=-1
    || this.cdata[i].user_name.toLowerCase().indexOf(this.searchText)!=-1
     || this.cdata[i].user_lastname.toLowerCase().indexOf(this.searchText)!=-1
     || this.cdata[i].user_phone.indexOf(this.searchText)!=-1
     ){
  this.elements[d] = { "address":this.cdata[i].address,"date":this.cdata[i].date,
     "type":this.cdata[i].type,
    "user_name":this.cdata[i].user_name, "user_phone":this.cdata[i].user_phone, "value":this.cdata[i].value};
  d++;
    }
   
   
  

   }
   
 
   
   
  
    }
    else{
      this.elements=this.response.counters_data;
    }
    
    
    
  }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 'gas', item_text: 'Газ' },
      { item_id: 'electricity', item_text: 'Электричество' },
      { item_id: 'heating', item_text: 'Отопление' },
      { item_id: 'hot_water', item_text: 'Горячая вода' },
      { item_id: 'cold_water', item_text: 'Холодная вода' },
    ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Сброс',
      
      
     
    };
    
  }
  
  onItemSelect(item: any) {
    this.c=0;
    this.searchRes=this.response.counters_data;
    this.elements=[];
    
    for(let i in this.searchRes ){
      for(let j in this.selectedItems){
        
        if(this.searchRes[i].type ==this.selectedItems[j].item_text){
          this.elements[this.c] = { "address":this.searchRes[i].address,"date":this.searchRes[i].date,
          "type":this.searchRes[i].type,
         "user_name":this.searchRes[i].user_name, "user_phone":this.searchRes[i].user_phone, "value":this.searchRes[i].value};
       this.c++;
        }
        
       
      }}
   
    }

 
  onSelectAll(items: any) {
    this.elements=this.response.counters_data;
   
  
    
  
  }
  onDeSelect(item:any){
    if(this.selectedItems.length!=0){


      this.c=0;
      this.searchRes=this.response.counters_data;
      this.elements=[];
      
    
      for(let i in this.searchRes ){
        for(let j in this.selectedItems){
        
        
          
          if(this.searchRes[i].type ==this.selectedItems[j].item_text){
            this.elements[this.c] = { "address":this.searchRes[i].address,"date":this.searchRes[i].date,
            "type":this.searchRes[i].type,
           "user_name":this.searchRes[i].user_name, "user_phone":this.searchRes[i].user_phone, "value":this.searchRes[i].value};
         this.c++;
          }
          
         
        }
      }


    }
    else{
      this.elements=this.response.counters_data;
    }
    
  }



    

    }
