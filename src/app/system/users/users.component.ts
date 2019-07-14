import { Component,OnInit, HostListener} from '@angular/core';
import { MdbTableService } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'yh-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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
  headElements = ['#','Аккаунт', 'Фамилия', 'Имя', 'Телефон','Дата регистрации','Адрес'];
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




  constructor(
    private http: HttpClient,private tableService: 
    MdbTableService,private router:Router,private cookieService: CookieService

  ) {


    this.token =this.cookieService.get('token');
    
    this.ccid =this.cookieService.get('ccid');
    
    //Получаем запросом GET Заказы


this.url=" http://cc20821.tmweb.ru/api/get_users.php?ccid="+this.ccid;
    
     this.http.get(this.url).subscribe((response)=>{
       console.log(response);
      this.response=response;
      this.elements=this.response.users;




   });
  
  }

  getFrom(from:MatDatepickerInputEvent<Date>) {
    this.from=from.value;
    let d=0;
  
  if(this.to){
    this.elements=[];
    
 
   for(let i in this.response.users){
     if(new Date(this.response.users[i].regDate)<this.to && new Date(this.response.users[i].regDate)>this.from){
      this.elements[d] = { 
        "id":this.response.users[i].id,
        "account":this.response.users[i].account,
        "lastname":this.response.users[i].lastname,
        "name":this.response.users[i].name,
        "regDate":this.response.users[i].regDate,
        "address":this.response.users[i].address,
      };
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
   
      for(let i in this.response.users){
        if(new Date(this.response.users[i].regDate)<this.to && new Date(this.response.users[i].regDate)>this.from){
         this.elements[d] = { 
           "id":this.response.users[i].id,
           "account":this.response.users[i].account,
           "lastname":this.response.users[i].lastname,
           "name":this.response.users[i].name,
           "regDate":this.response.users[i].regDate,
           "address":this.response.users[i].address,
         };
        d++;
        }
       }
     
  
    }
      console.log(this.elements);
      }


      @HostListener('input') oninput() {
        this.searchText=this.searchText.toLowerCase();
        this.d=0;
        this.searchRes=[];
        if(this.searchText !=""){
          this.cdata=this.response.users;
          for(let i in this.cdata ){
            if(this.cdata[i].id.toLowerCase().indexOf(this.searchText)!=-1 
            
             || this.cdata[i].lastname.toLowerCase().indexOf(this.searchText)!=-1 
             || this.cdata[i].name.toLowerCase().indexOf(this.searchText)!=-1
             || this.cdata[i].regDate.toLowerCase().indexOf(this.searchText)!=-1
             || this.cdata[i].address.toLowerCase().indexOf(this.searchText)!=-1
            
            )
                {
                  this.searchRes[this.d] = {  
                    "id":this.response.users[i].id,
           "account":this.response.users[i].account,
           "lastname":this.response.users[i].lastname,
           "name":this.response.users[i].name,
           "regDate":this.response.users[i].regDate,
           "address":this.response.users[i].address,
          
          
          }
      
      
      
                this.d++
                }
      this.elements=this.searchRes;
          }
        
        }
      else{
        this.elements=this.response.users;
      }
      
      
      
      }
       

















  ngOnInit() {
  }

}
