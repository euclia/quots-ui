import { Component, OnInit } from '@angular/core';
import { AppService } from '../api/app.service';
import { Application } from '../models/applications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addapp',
  templateUrl: './addapp.component.html',
  styleUrls: ['./addapp.component.css']
})
export class AddappComponent implements OnInit {

  enabled:boolean = true
  canadd:boolean = true

  appid:string
  baseurl:string

  constructor(
    private appService:AppService,
    private router:Router
  ) { }

  ngOnInit() {
  }


  addApp(){
    let applic = <Application>{}

    applic.id = this.appid
    applic.baseURLS = [this.baseurl]
    applic.enabled = this.enabled
    this.appService.addApp(applic).subscribe((res:Application) =>{
      this.router.navigate(['/applications/' + res.id])
    })

  }

}
