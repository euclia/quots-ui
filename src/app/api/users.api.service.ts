import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { SessionService } from '../session/session.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { Config } from './apiconfig';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  path:string

  constructor(
    private http:HttpClient,
    private sessionService:SessionService,
    private dialogsService:DialogsService
  ) {
    if(Config.QuotsPort.length > 2){
      this.path = Config.QuotsHttpScheme + '//' + Config.QuotsApiBase + ":" + "8000"
    }else{
      this.path = Config.QuotsHttpScheme + '//' + Config.QuotsApiBase
    }
  }

  public getUserById(id:string):Observable<any>{
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/users/" + id
    return this.http.get(path, {headers:headers}).pipe(
      tap((res : Response) => { 
        return res            
    }),catchError( err => this.dialogsService.onError(err) )
    )
  }

  public getUsers(min:Number, max:Number):Observable<Array<User>>{
    let params = new HttpParams().set('min', min.toString()).set('max', max.toString()).set('email', '');
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/users"
    return this.http.get(path, {headers:headers, params:params}).pipe(
      tap((res : Response) => { 
        return res            
    }),catchError( err => this.dialogsService.onError(err) )
    )
  }

  public getUserByEmail(email:string):Observable<Array<User>>{
    let params = new HttpParams().set('min', "0").set('max', "0").set('email', email);
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/users"
    return this.http.get(path, {headers:headers, params:params}).pipe(
      tap((res : Response) => { 
        return res            
    }),catchError( err => this.dialogsService.onError(err) )
    )
  }

  public updateUsersCredits(suer:User):Observable<User>{
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/users/credits"
    return this.http.put(path,suer, {headers:headers}).pipe(
      tap((res : Response) => { 
        return res            
    }),catchError( err => this.dialogsService.onError(err) )
    )
  }

  public countAllUsers():Observable<HttpResponse<User>>{
    let params = new HttpParams().set('min', "0").set('max', "1").set('email', '');
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/users"
    return this.http.get(path, {headers:headers, params:params,observe: 'response'}).pipe(
      tap((res : HttpResponse<User>) => { 
        return res            
    }),catchError( err => this.dialogsService.onError(err) )
    )
  }

}
