import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { SessionService } from '../session/session.service';
import { Config } from './apiconfig';
import { tap, catchError } from 'rxjs/operators';
import { Application } from '../models/applications';
import { DialogsService } from '../dialogs/dialogs.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

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

  public getApps(min:Number, max:Number):Observable<Array<Application>>{
    let params = new HttpParams().set('min', min.toString()).set('max', max.toString());
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/app"
    return this.http.get(path, {headers:headers, params:params}).pipe(
      tap((res : Response) => { 
        return res            
    }),catchError( err => this.dialogsService.onError(err) )
    )
  }

  public addApp(app:Application){
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/app"
    return this.http.post(path, app, {headers:headers}).pipe(
      tap((res:Response)=>{
        return res
      }),catchError(err => this.dialogsService.onError(err))  
    )
  }

  public getAppById(id:string){
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/app/" +id
    return this.http.get(path, {headers:headers}).pipe(
      tap((res:Response)=>{
        return res
      }),catchError(err => this.dialogsService.onError(err))  
    )
  }

  public updateAppSecret(id:String){
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/app/" +id + "/secret"
    return this.http.put(path,{}, {headers:headers}).pipe(
      tap((res:Response)=>{
        return res
      }),catchError(err => this.dialogsService.onError(err))  
    )
  }

  public updateApp(app:Application){
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/app"
    return this.http.put(path, app, {headers:headers}).pipe(
      tap((res:Response)=>{
        return res
      }),catchError(err => this.dialogsService.onError(err))  
    )
  }

  public deleteApp(appId:string){
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/app/" + appId
    return this.http.delete(path, {headers:headers}).pipe(
      tap((res:Response)=>{
        return res
      }),catchError(err => this.dialogsService.onError(err))  
    )
  }

  public countAllApps():Observable<HttpResponse<Application>>{
    let params = new HttpParams().set('min', "0").set('max', "1");
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/app"
    return this.http.get(path, {headers:headers, params:params,observe: 'response'}).pipe(
      tap((res : HttpResponse<Application>) => { 
        return res            
    }),catchError( err => this.dialogsService.onError(err) )
    )
  }

}
