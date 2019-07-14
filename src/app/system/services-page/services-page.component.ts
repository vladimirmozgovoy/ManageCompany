import { Component,OnInit, HostListener} from '@angular/core';
import { MdbTableService } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'yh-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent  {
  //Параметры
  class:any=null;
  plName:any="Введите название услуги";
  plDes:any="Введите описание услуги";
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  closeResult: string;
 panelOpenState = false;
  url:any;
  elements: any  ;
  headElements = ['Название', 'Категория','Описание'];
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
  service_name:any;
  service_category:any="Услуги сервиса твой дом";
  service_description:any;
  nameService:any;
  descriptionService:any;
  categoryService:any;
  sid:any;
  edit:any;
  
  
  //Получение услуг методом POST
  getServices(){
   //Проверка пользователя на то что он авторизован
    if(this.token ==200){
      console.log(this.cookieService.get('ccid'));
      this.url="http://cc20821.tmweb.ru/api/services.php";
  
          const body = {token:this.token,ccid:this.ccid};
           this.http.post(this.url,body).subscribe((response)=>{
            this.response=response;
            this.elements=this.response.services_cc;
         
          
          })
      }
      else{
        this.router.navigate(['/login']);
      }
  }

  constructor(private http: HttpClient,private tableService: MdbTableService,private router:Router,private cookieService: CookieService,
    private modalService: NgbModal
    
    ) {


      
    // Получение Cookies
    this.token =this.cookieService.get('token');
    
    this.ccid =this.cookieService.get('ccid');
    
    
    
    
  
   }
   //Открыть модальное окно
   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

//Добавление услуги
  send(){
    if(this.service_name && this.service_description){ 
     
      this.url='http://cc20821.tmweb.ru/api/add_service.php';
    
      const body = {token:this.token,ccid:this.ccid,service_name:this.service_name,
        service_category:this.service_category,service_description:this.service_description};
      this.http.post(this.url,body).subscribe((response)=>{
       this.response=response;
       console.log(response);
       if(this.response==200){
         window.location.reload();
       }
       
    
     
     });

    }
else{
  this.plName="Вы не ввели название услуги";
  this.plDes="Вы не ввели описание услуги";
  this.class="pl";
}

  }
  //Получение значений услуги , которую нужно редактировать
  editService(sid,name,category,description,edit)
  {

    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.sid=sid;
this.nameService=name;
this.descriptionService=description;
this.categoryService=category;
console.log(this.sid);
  }
  
  //Изменение услуги
  editServ(){
    if(this.nameService && this.descriptionService){ 


      this.url="http://cc20821.tmweb.ru/api/edit_service.php";
      //this.url='http://www.tvoydom24.com/api5/edit_service.php';
      const body = {sid:this.sid,token:this.token,ccid:this.ccid,
        service_name:this.nameService,service_category:this.categoryService,service_description:this.descriptionService};
      this.http.post(this.url,body).subscribe((response)=>{
       this.response=response;
       if(this.response=200){
       //Если изменение услуг произошло усешно перезагружаем страницу
        window.location.reload();
        
      }
     
       
    
     
     });




    }
     
    
   

  }
 //Удаление услуги
 
  deleteServ(sid){
   
    this.url="http://cc20821.tmweb.ru/api/delete_service.php";
    //this.url='http://www.tvoydom24.com/api/delete_service.php';
    const body = {sid:sid,token:this.token,ccid:this.ccid};
    this.http.post(this.url,body).subscribe((response)=>{
     this.response=response;
     
  
  if(this.response=200){
    this.getServices();
  }
   
   })
  }
  
  // Системная функция связанная с модальным окном не трогать
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  

  ngOnInit() {
    
    
    this.getServices();
  }
  
}
/*


Проверка валидации форма еще не была реализована














*/ 