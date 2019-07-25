import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public setQuotsApiKey(apikey:string){
    localStorage.setItem("QUOTSKEY", apikey);
  }

  public getQuotsApiKey(){
    return localStorage.getItem("QUOTSKEY");
  }

  public deleteQuotsKet(){
    localStorage.removeItem("QUOTSKEY");
  }
}
