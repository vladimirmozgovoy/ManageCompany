import { Component,OnInit, HostListener} from '@angular/core';
import { MdbTableService } from 'angular-bootstrap-md';
import { HttpClient } from '@angular/common/http';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { CookieService } from 'ngx-cookie-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'yh-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})



export class NewsPageComponent {
 //Параметры
 
 nid:any;
 pUrl:any;
  closeResult: string;
  sid:any;
  titleNews:any;
  descriptionNews:any;
 token:any;
 ccid:any; 
 url:any;
  elements: any  ;
  response:any ;
  post:any;
selectedFile:File=null;
add_DescriptionNews:any;
add_TitleNews:any; 
  res:any;
 editImg:File=null;
 edForm:boolean=false;
 addImg:boolean=false;
 add_pl_title:any="Введите название";
 add_pl_description:any="Введите описание";
 pl_img:any="Выберите изображение";
 class:any=null;
 choose:any=null;


  constructor(private http: HttpClient,private tableService: 
    MdbTableService,private cookieService: CookieService,private modalService: NgbModal) {
   // Получаем Сookies
    this.token =this.cookieService.get('token');
    this.ccid =this.cookieService.get('ccid');
   
   //Запросом GET получаем новости
    
   //http://cc20821.tmweb.ru
   this.url="http://cc20821.tmweb.ru/api/cc_news.php?ccid="+this.ccid;
  
   //this.url="http://www.tvoydom24.com/api/cc_news.php?ccid="+this.ccid;
    //this.url="http://tvoydom/cc_news.php?ccid="+this.ccid;
    
    this.http.get(this.url)
    .subscribe((response)=>{
      this.response=response;
      this.elements=this.response.cc_news;
      console.log(this.elements);
      
      
     
    })
  
    
 
   }

   
   

val(el){
  el=typeof el;
if( el === "underfined"){
return true;
}
else{
  return false;
}
}





   onFileSelected(event){
this.selectedFile=<File>event.target.files[0];
console.log(this.selectedFile);
this.addImg=true;
this.choose=null;
this.pl_img=this.selectedFile.name;
   }
   imgChange(event){
    this.editImg=<File>event.target.files[0];
    console.log(this.editImg);
    this.edForm=true;
   }






   Upload(){
     if(this.add_TitleNews && this.add_DescriptionNews && this.addImg ){
  
      this.pUrl="http://cc20821.tmweb.ru/api/new_news.php";
    // this.pUrl="http://tvoydom/new_news.php";
     
     const fd =new FormData();
      fd.append('image',this.selectedFile,this.selectedFile.name);
      fd.append('title',this.add_TitleNews);
      fd.append('description',this.add_DescriptionNews);
      fd.append('ccid',this.ccid);
      this.http.post(this.pUrl,fd).subscribe(res=>{
        this.res=res;
       if(this.res.code==300){
         window.location.reload();
 
       }
 
      });
      
     }
     else{
       this.class="pl";
       this.add_pl_title="Вы не ввели название";
       this.add_pl_description="Вы не ввели описание";
       if(!this.addImg){this.pl_img="Нет изображения"; this.choose="choose"; }
       
       
     
     }
   



   
    }
//Открываем модальное окно Добавить новость
   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


// Открываем модальное окно редактировать новость
  editWindow(img,nid,title,description,edit)
  {

    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    //Получаем параметры новости , которую нужно редактировать
this.nid=nid;
    this.titleNews=title;
this.descriptionNews=description;



  }
  deleteNews(nid){
    this.pUrl="http://cc20821.tmweb.ru/api/delete_news.php?nid="+nid;
   // this.pUrl="http://tvoydom/delete_news.php?nid="+nid;
    
    this.http.get(this.pUrl).subscribe(res=>{
      this.res=res;
     if(this.res==200){
      this.url="http://cc20821.tmweb.ru/api/cc_news.php?ccid="+this.ccid;
    this.http.get(this.url)
    .subscribe((response)=>{
      this.response=response;
      this.elements=this.response.cc_news;
      
      
      
     
    })
     }

    });
   }

  Edit(){

    this.pUrl="http://cc20821.tmweb.ru/api/edit_news.php";
   // this.pUrl="http://tvoydom/edit_news.php";
    if(this.titleNews,this.descriptionNews){
      const fd =new FormData();
      if(this.editImg!=null){   fd.append('image',this.editImg,this.editImg.name); }
   
      fd.append('title',this.titleNews);
      fd.append('description',this.descriptionNews);
      fd.append('ccid',this.ccid);
      fd.append('nid',this.nid);
      this.http.post(this.pUrl,fd).subscribe(res=>{
        console.log(res);
        this.res=res;
       if(this.res.code==200){
         window.location.reload();
    
       }
    
      });
    }
   
  
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




