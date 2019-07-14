import { Component,OnInit, HostListener} from '@angular/core';
import { MdbTableService } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { getMaxListeners } from 'cluster';


@Component({
  selector: 'yh-mail-page',
  templateUrl: './mail-page.component.html',
  styleUrls: ['./mail-page.component.scss']
})


export class MailPageComponent  {
  from:any;
  to:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
 panelOpenState = false;
 token:any;
 ccid:any; 
 url:any;
  elements: any  ;
  test: any;
  headElements = ['№обр', 'Дата', 'Адрес','Тема обращения','Статус'];
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
  let data= this.response.appeal
  if(this.to){
    this.elements=[];
 
   for(let i in data){
     if(new Date(data[i].date)<this.to && new Date(data[i].date)>this.from){
      this.elements[d] = { 
     
      "address":data[i].address,
      "date":data[i].date,
      "type":data[i].type,
      "user_name":data[i].name,
      "user_phone":data[i].phone, 
      "value":data[i].value,
      "shid":data[i].shid,
      "msg":data[i].msg,
      "status":data[i].status,
      "dateDone":data[i].dateDone,
      "dateWorking":data[i].dateWorking,

    
    
    
    };
     d++;
     }
    }
   

    }
  
  }

  getTo(to:MatDatepickerInputEvent<Date>) {
    this.to=to.value;
   let data=this.response.appeal;
    let d=0;
  
  if(this.from){
    this.elements=[];
 
   for(let i in data){
     if(new Date(data[i].date)<this.to && new Date(data[i].date)>this.from){
      this.elements[d] = { 
        
        
        "address":data[i].address,
        "date":data[i].date,
        "type":data[i].type,
        "user_name":data[i].name,
        "user_phone":data[i].phone, 
        "value":data[i].value,
        "shid":data[i].shid,
        "msg":data[i].msg,
        "status":data[i].status,
        "dateDone":data[i].dateDone,
        "dateWorking":data[i].dateWorking,
    
    
    
    };
     d++;
     }
    }
   

  }
  
  }

  constructor(private http: HttpClient,private tableService: 
    MdbTableService,private cookieService: CookieService) {
    
    this.token =this.cookieService.get('token');
    this.ccid =this.cookieService.get('ccid');
    this.url="http://cc20821.tmweb.ru/api/get_mail.php?ccid="+this.ccid;
   // http://cc20821.tmweb.ru
    //this.url="http://tvoydom/get_mail.php?ccid="+this.ccid;
    //this.url="http://tvoydom24.com/api5/get_mail.php?ccid="+this.ccid;
    this.http.get(this.url)
    .subscribe((response)=>{
      this.response=response;
      this.elements=this.response.appeal;
     
      
     
    });
    
    
  
   }

   getMail(){
    this.url="http://www.tvoydom24.com/api5/get_mail.php?ccid="+this.ccid;
    this.http.get(this.url)
    .subscribe((response)=>{
      this.response=response;
      this.elements=this.response.appeal;
     
      
     
    });
   }
  @HostListener('input') oninput() {
    
    
let data=this.response.appeal;
    
    
    

   
this.searchText=this.searchText.toLocaleLowerCase();
    let d=0;
    this.elements=[]
    if(this.searchText !=""){
      
   
  
   
   for(let i in data ){
    if(data[i].address.toLowerCase().indexOf(this.searchText)!=-1 
     || data[i].shid.indexOf(this.searchText)!=-1
     || data[i].type.toLowerCase().indexOf(this.searchText)!=-1 
     || data[i].date.indexOf(this.searchText)!=-1
     || data[i].name.toLowerCase().indexOf(this.searchText)!=-1
     || data[i].msg.toLowerCase().indexOf(this.searchText)!=-1
     || data[i].phone.indexOf(this.searchText)!=-1
     || data[i].status.toLowerCase().indexOf(this.searchText)!=-1
     ){
  this.elements[d] = { 
    
    "address":data[i].address,
        "date":data[i].date,
        "type":data[i].type,
        "name":data[i].name,
        "phone":data[i].phone, 
        "value":data[i].value,
        "shid":data[i].shid,
        "msg":data[i].msg,
        "status":data[i].status,
        "dateDone":data[i].dateDone,
        "dateWorking":data[i].dateWorking,
  
  
  }
    
    
    
    ;
  d++;
    }
   
   
    
    
    
  }
}
else{
  this.elements=this.response.appeal;
}
  }

  ngOnInit() {
    this.dropdownList = [

      { item_id: 'new', item_text: 'Новый' },
      { item_id: 'working', item_text: 'В работе' },
      { item_id: 'done', item_text: 'Выполнен' },
      
    ];
    
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Сброс',
      
      
     
    };
  }
  work(shid){
    

    this.url="http://www.tvoydom24.com/api5/edit_status_appeal.php";
   //this.url="http://tvoydom/edit_status_appeal.php";
      const fd =new FormData();
     
   
      fd.append('shid',shid);
      fd.append('status',"working");
     
      this.http.post(this.url,fd).subscribe(res=>{
        console.log(res);
        
       if(res==200){
        this.getMail();
    
       }
    
      });
   
  }

  done(shid){
   
   
   
    this.url="http://www.tvoydom24.com/api5/edit_status_appeal.php";
   //this.url="http://tvoydom/edit_status_appeal.php";
      const fd =new FormData();
     
   
      fd.append('shid',shid);
      fd.append('status',"done");
     
      this.http.post(this.url,fd).subscribe(res=>{
        console.log(res);
        
       if(res==200){
        this.getMail();
    
       }
    
      });

  }
  
  
  
  onItemSelect(item: any) {
    let c=0
    
    let data=this.response.appeal;
    this.elements=[];
    
    for(let i in data ){
      for(let j in this.selectedItems){
        
        if(data[i].status ==this.selectedItems[j].item_text){
          this.elements[c] = { 
            
            
            "address":data[i].address,
            "date":data[i].date,
            "type":data[i].type,
            "name":data[i].name,
            "phone":data[i].phone, 
            "value":data[i].value,
            "shid":data[i].shid,
            "msg":data[i].msg,
            "status":data[i].status,
            "dateDone":data[i].dateDone,
            "dateWorking":data[i].dateWorking,
        
        
        
        
        
        
        };
       c++;
        }
        
       
      }}
    }
    onSelectAll(items: any) {
      this.elements=this.response.appeal;
    
    }

    onDeSelect(item:any){
      if(this.selectedItems.length!=0){
  
  
        let c=0;
        let data=this.response.appeal;
        this.elements=[];
        
      
        for(let i in data ){
          for(let j in this.selectedItems){
          
          
            
            if(data[i].type ==this.selectedItems[j].item_text){
              this.elements[data] = { 
                
                
                "address":data[i].address,
        "date":data[i].date,
        "type":data[i].type,
        "name":data[i].name,
        "phone":data[i].phone, 
        "value":data[i].value,
        "shid":data[i].shid,
        "msg":data[i].msg,
        "status":data[i].status,
        "dateDone":data[i].dateDone,
        "dateWorking":data[i].dateWorking,
            
            
            
            
            };
           c++;
            }
            
           
          }
        }
  
  
      }
      else{
        this.elements=this.response.appeal;
      }
      
    }
  










































































}
