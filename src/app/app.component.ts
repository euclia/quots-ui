import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './api/login.service';
import { AuthResponse } from './models/authresponse';
import { SessionService } from './session/session.service';
import { catchError, tap } from 'rxjs/operators';
import { ValidationResponse } from './models/validationResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cookieValue:string
  loggedin:Boolean = false
  apikey:string
  hide = true;

  username:string
  password:string

  title = 'quots-ui';

  constructor(
    private cookieService: CookieService,
    private sessionService:SessionService,
    private loginApi: LoginService,
    private router:Router
  ){}


  ngOnInit(){
    // this.cookieService.set("name", "val", 30, "/", "jaqpot.rg")
    // this.cookieValue = this.cookieService.get('jaqpot')
    this.apikey = this.sessionService.getQuotsApiKey()
    this.loginApi.validateApiKey(this.apikey).pipe( 
      tap( (resp:ValidationResponse) =>{
        return resp;
      },catchError(err => this.noValid(err)))).subscribe(resp => {
        this.loggedin = true;
        this.router.navigate(['applications'])
      }) 
  }

  login(){
    this.loginApi.getApiKey(this.username, this.password).subscribe((resp:AuthResponse) =>{
      if (typeof resp != 'undefined'){
        this.loggedin = true;
        this.sessionService.setQuotsApiKey(resp.apikey)
        this.router.navigate(['applications'])
      }
    })
  }

  noValid(err:HttpErrorResponse){
    if (err.error instanceof Error) {
      console.error('An error occurred:', err.error.message);
    } else {
      this.sessionService.deleteQuotsKet()
      this.loggedin = false;
      console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
    }
    return EMPTY;
  }

  goTo(rout:string){
    this.router.navigate([rout])
  }

}
