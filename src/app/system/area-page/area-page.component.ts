import { Component,OnInit, HostListener} from '@angular/core';
import { MdbTableService } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'yh-area-page',
  templateUrl: './area-page.component.html',
  styleUrls: ['./area-page.component.scss']
})
export class AreaPageComponent  {
 

// Свойства
edit_city:any;
edit_street:any;
edit_number:any;
edit_liter:any;
edit_apparts:any;
edit_gas:boolean=false;
edit_electricity:boolean=false;
edit_heating:boolean=false;
edit_hot_water:boolean=false;
edit_cold_water:boolean=false;
edit_aid:any;


apparts:any;
name_street:any;
name_city:any;
number:any;
liter:any;
gas:boolean=false;
electricity:boolean=false;
heating:boolean=false;
hot_water:boolean=false;
cold_water:boolean=false;
closeResult: string;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
 panelOpenState = false;
 token:any;
 ccid:any; 
 url:any;
  elements: any  ;
  test: any;
  headElements = ['Город', 'Улица', 'Номер дома', 'Типы счетчиков'];
  response:any ;
  post:any;
payments:any;
  searchText: string = '';
  previous: string;
  fromDate:any;
  toDate:any;
  monthFrom: any;
  monthTo: any;
  
  
 
  
  //Возращает значение даты до и отправляет 2 даты для поиска подходящего промежутка 
  
 

  constructor(private http: HttpClient,private tableService: 
    MdbTableService,private cookieService: CookieService,private modalService: NgbModal) {
    
    
     
    this.token =this.cookieService.get('token');
    this.ccid =this.cookieService.get('ccid');
    this.url="http://cc20821.tmweb.ru/api/get_area.php?ccid="+this.ccid;
    // this.url="http://tvoydom/get_area.php?ccid="+this.ccid;
    //this.url="http://www.tvoydom24.com/api5/get_area.php?ccid="+this.ccid;
    // GET запрос для 
    this.http.get(this.url)
    .subscribe((response)=>{
      
      this.response=response;
      this.elements=this.response.areaList;
     console.log(this.elements);
      
      
     
    })
    
    
  
   }

getArea(){
  this.url="http://cc20821.tmweb.ru/api/get_area.php?ccid="+this.ccid;
    // GET запрос для 
    this.http.get(this.url)
    .subscribe((response)=>{
      
      this.response=response;
      this.elements=this.response.areaList;
     console.log(this.elements);
      
      
     
    })
}

  @HostListener('input') oninput() {
    let d=0;
let data=this.response.areaList;
  this.searchText=this.searchText.toString().toLowerCase();
       
        this.elements=[]
        if(this.searchText !=""){
          
       
      
       
       for(let i in data ){
        
         if(data[i].street.toLowerCase().indexOf(this.searchText)!=-1 
         ||data[i].home.toString().indexOf(this.searchText)!=-1 
         || data[i].hotwater.toLowerCase().indexOf(this.searchText)!=-1
         || data[i].coldwater.toLowerCase().indexOf(this.searchText)!=-1
         || data[i].heating.toLowerCase().indexOf(this.searchText)!=-1
         || data[i].electric.toLowerCase().indexOf(this.searchText)!=-1
         ||data[i].gas.toLowerCase().indexOf(this.searchText)!=-1
          
         )
         {
      this.elements[d] = { 
        
              "city":data[i].city,
              "street":data[i].street,
               "home":data[i].home,
               "liter":data[i].liter,
              "hotwater":data[i].hotwater,
              "coldwater":data[i].coldwater,
               "heating":data[i].heating,
               "electric":data[i].electric,
               "gas":data[i].gas,
        
        
        };
      d++;
        }
       
       
      
    
       }
       
     
       console.log(this.elements);
       
      
        }
        else{
          this.elements=this.response.areaList;
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
   
   
    let c=0;
    let data=this.response.areaList;
    this.elements=[];
    
    for(let i in data ){
      for(let j in this.selectedItems){
        
        if(data[i].coldwater ==this.selectedItems[j].item_text
          ||data[i].hotwater==this.selectedItems[j].item_text
          ||data[i].heating==this.selectedItems[j].item_text
          ||data[i].gas==this.selectedItems[j].item_text
          ||data[i].electric==this.selectedItems[j].item_text
          ){
          this.elements[c] = { 
            
            "city":data[i].city,
            "street":data[i].street,
             "home":data[i].home,
             "liter":data[i].liter,
            "hotwater":data[i].hotwater,
            "coldwater":data[i].coldwater,
             "heating":data[i].heating,
             "electric":data[i].electric,
             "gas":data[i].gas,
        };
       c++;
        }
        
       
      }}
   
   
   //Добавление адресса

  
   
    
  
  
  
  
  
  
  
  
  
  
  
  
  }
counter(c){ 
  switch(c) { 
     case true: { 
       c=1;
       return c;
        break; 
     } 
     case false: { 
      c=0;
      return c;
        break; 
     } 
      
  }


}
toCheck(c){
  switch(c) { 
    case "1": { 
      c=true;
      return c;
       
    } 
    case "0": { 
     c=false;
     return c;
       
    } 
     
 }
}

  addAdress(){

    this.url="http://cc20821.tmweb.ru/api/get_area.php?ccid="+this.ccid;
    //this.pUrl="http://tvoydom24.com/api5/new_news.php";
    // this.url="http://www.tvoydom24.com/api5/add_area.php";
     //this.url="http://tvoydom/add_area.php";
     if(
       this.name_city
       &&this.name_street
       &&this.number
       &&this.apparts
      
       ){
         if(!this.liter){this.liter="";}

        const fd =new FormData();
        fd.append('ccid',this.ccid);
         fd.append('name_city',this.name_city);
         fd.append('name_street',this.name_street  );
         fd.append('number',this.number);
         fd.append('liter',this.liter);
         fd.append('gas',this.counter(this.gas));
         fd.append('electricity',this.counter(this.electricity));
         fd.append('heating',this.counter(this.heating));
         fd.append('hot_water',this.counter(this.hot_water));
         fd.append('cold_water',this.counter(this.cold_water));
         fd.append('apparts',this.apparts);
         this.http.post(this.url,fd).subscribe(res=>{
           console.log(res);
          if(res==200){
            window.location.reload();
    
          }
    
         });

       }
     


   }


  onSelectAll(items: any) {
    this.elements=this.response.areaList;
   
  
    
  
  }



  onDeSelect(item:any){
    if(this.selectedItems.length!=0){


      let c=0;
      let data=this.response.areaList;
      this.elements=[];
      
      for(let i in data ){
        for(let j in this.selectedItems){
          
          if(data[i].coldwater ==this.selectedItems[j].item_text
            ||data[i].hotwater==this.selectedItems[j].item_text
            ||data[i].heating==this.selectedItems[j].item_text
            ||data[i].gas==this.selectedItems[j].item_text
            ||data[i].electric==this.selectedItems[j].item_text
            ){
            this.elements[c] = { 
              
              "city":data[i].city,
              "street":data[i].street,
               "home":data[i].home,
               "liter":data[i].liter,
              "hotwater":data[i].hotwater,
              "coldwater":data[i].coldwater,
               "heating":data[i].heating,
               "electric":data[i].electric,
               "gas":data[i].gas,
          
          };
         c++;
          }
          
         
        }}
      


    }
    else{
      this.elements=this.response.areaList;
    }
    
  }



//Открытие модального окна


open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

editWindow(aid,city,street,number,
  liter,gas,electric,heating,hotwater,coldwater,apparts,edit)
  {

    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.edit_aid=aid;
    this.edit_city=city;
    this.edit_street=street;
    this.edit_number=number;
    this.edit_liter=liter;
    this.edit_hot_water=this.toCheck(hotwater);
    this.edit_cold_water=this.toCheck(coldwater);
    this.edit_heating=this.toCheck(heating);
    this.edit_electricity= this.toCheck(electric);
    this.edit_gas=this.toCheck(gas);
    this.edit_apparts=apparts;


    //Получаем параметры новости , которую нужно редактировать




  }
  Edit(){
 
this.url=" http://cc20821.tmweb.ru/api/edit_area.php";

if(
  this.edit_city
  &&this.edit_street
  &&this.edit_number
  &&this.edit_apparts
 
  ){

    const fd =new FormData();
    
    fd.append('ccid',this.ccid);
    fd.append('aid',  this.edit_aid);
    fd.append('city',this.edit_city);
    fd.append('street',this.edit_street  );
    fd.append('number',this.edit_number);
    fd.append('liter',this.edit_liter);
    fd.append('gas',this.counter(this.edit_gas));
    fd.append('electricity',this.counter(this.edit_electricity));
    fd.append('heating',this.counter(this.edit_heating));
    fd.append('hot_water',this.counter(this.edit_hot_water));
    fd.append('cold_water',this.counter(this.edit_cold_water));
    fd.append('apparts',this.edit_apparts);
   
    this.http.post(this.url,fd).subscribe(res=>{
      console.log(res);
     if(res==200){
       window.location.reload();
   
     }
   
    });


  }


 



  }

Delete(aid){
  const fd =new FormData();
 
  fd.append('aid',aid);
  this.url=" http://cc20821.tmweb.ru/api/del_area.php";

  this.http.post(this.url,fd).subscribe(res=>{
    console.log(res);
   if(res==200){
     this.getArea();
 
   }
 
  });



}









// Функция которая возращает метод закрытия модального окна , не трогать она системная
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}



















}
