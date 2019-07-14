import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'yh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

//Cвойства

  url:any;
response:any;
cookieValue :any;
  login:any;
password:any;

  constructor(private http: HttpClient, private router:Router,private cookieService: CookieService) {
    
   //Удаляем ранесозданные Cokkies
    cookieService.deleteAll();
  
  
  
  }
    
  //Отправляем логин и пароль  
  
  send() {
      const body = {login:this.login,password:this.password};
      this.url="http://cc20821.tmweb.ru/api/testPost.php";
       //this.url="http://www.tvoydom24.com/api/testPost.php";
       this.http.post(this.url,body).subscribe((response)=>{
        this.response=response;
        console.log(this.response);
        
     
     if(this.response.success=='200'){
     this.cookieService.set( 'token', '200' );
     
     this.cookieService.set( 'ccid', this.response.ccid );
     this.router.navigate(['/system/payments']);
     }
     
    
      })
    }
  

  ngOnInit() {
  }

}
