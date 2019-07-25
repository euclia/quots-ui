import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Config } from './apiconfig';
import { map, filter, catchError, mergeMap, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/authresponse';
// import { Observable } from 'rxjs/Observable';
import { Observable} from 'rxjs';
import {EMPTY} from 'rxjs';
import { DialogsService } from '../dialogs/dialogs.service';
import { ValidationResponse } from '../models/validationResponse';
import { SessionService } from '../session/session.service';
import { RefreshedToken } from '../models/refreshedApiKey';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  path:string

  constructor(
    private http:HttpClient,
    private dialogsService:DialogsService,
    private sessionService:SessionService) {

      if(Config.QuotsPort.length > 2){
        this.path = Config.QuotsHttpScheme + '//' + Config.QuotsApiBase + ":" + "8000"
      }else{
        this.path = Config.QuotsHttpScheme + '//' + Config.QuotsApiBase
      }
    }

  public getApiKey(username:string, password:string): Observable<AuthResponse> {
    let params = new HttpParams().set('username', username).set('password', password);
    let path = this.path + "/apikey"
    return this.http.get(path, { params: params }).pipe(
      tap((res : AuthResponse) => {
          return res;
      }),catchError(err => this.dialogsService.onError(err)));

  }

  public validateApiKey(apikey:string): Observable<ValidationResponse>{
    let params = new HttpParams().set('apikey', apikey);
    let path = this.path + "/apikey/valid"
    // let headers = new HttpHeaders().set('Authorization', "Bearer " + this.sessionService.getQuotsApiKey())
    // return this.http.get(path, { params: params, headers:headers })
    return this.http.get(path, { params: params})
  }

  public refreshApiKey(apikey:string): Observable<RefreshedToken>{
    let params = new HttpParams().set('apikey', apikey);
    const token = this.sessionService.getQuotsApiKey()
    const tokenValue = 'Bearer ' + token;
    let headers = new HttpHeaders().set('Authorization', tokenValue)
    let path = this.path + "/apikey/refresh"
    return this.http.put(path,{}, {headers:headers, params: params }).pipe(
      tap((res : RefreshedToken) => {
          return res;
      }),catchError(err => this.dialogsService.onError(err)));
  }

}