import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../api/app.service';
import { Application } from '../models/applications';
import { UsersService } from '../api/users.api.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material';
import { LoginService } from '../api/login.service';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.css']
})
export class AppsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  applications:Application[]
  
  // displayedColumns: string[] = ['Id', 'Enabled', 'BaseURL', 'Edit'];
  displayedColumns: string[] = ['Id', 'Enabled', 'Edit'];
  dataSource
  totalApps:number


  
  constructor(
    private appsService:AppService,
    private loginService:LoginService,
    private sessionService:SessionService,
    private router:Router
  ) { }

  ngOnInit() {  
    this.appsService.getApps(0, 10).subscribe(res =>{
      this.applications = res
      this.dataSource = res
    })
    this.appsService.countAllApps().subscribe((res:HttpResponse<any>) =>{
      this.totalApps = Number(res.headers.get('total'))
    })
    this.loginService.refreshApiKey(this.sessionService.getQuotsApiKey()).subscribe(res =>{
      if(res){
        this.sessionService.setQuotsApiKey(res.refreshedtoken)
      }
    })
  }

  editApp(app){
    this.router.navigate(['applications/' + app.id])
  }

  addApp(){
    this.router.navigate(['applications/add'])
  }

  getApps(event:PageEvent){
    let offset = event.pageSize * event.pageIndex
    let size = event.pageSize
    this.appsService.getApps(offset, size).subscribe(res =>{
      this.applications = res
      this.dataSource = res
    })
  }

}
