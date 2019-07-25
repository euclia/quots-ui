import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../api/users.api.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material';
import { LoginService } from '../api/login.service';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  users:Array<User>
  totalusers:Number
  displayedColumns: string[] = ['Email', 'Username', 'Edit'];
  dataSource
  email:string


  constructor(
    private usersApi:UsersService,
    private loginService:LoginService,
    private sessionService:SessionService,
    private router:Router
  ) { }

  ngOnInit() {
    this.usersApi.getUsers(0, 10).subscribe(res=>{
      this.users = res
      this.dataSource = res
      // console.log(this.users)
    })
    this.usersApi.countAllUsers().subscribe(res =>{
      this.totalusers = Number(res.headers.get('total'))
    })
    this.loginService.refreshApiKey(this.sessionService.getQuotsApiKey()).subscribe(res =>{
      if(res){
        this.sessionService.setQuotsApiKey(res.refreshedtoken)
      }
    })
  }

  edituser(user:User){
    this.router.navigate(["/users/" + user.id])
  }

  getusers(event:PageEvent){
    let offset = event.pageSize * event.pageIndex
    let size = event.pageSize
    this.usersApi.getUsers(offset, size).subscribe(res =>{
      this.users = res
      this.dataSource = res
    })
  }

  search(){
    this.usersApi.getUserByEmail(this.email).subscribe(res =>{
      if(res){
        this.users = res
        this.dataSource = [res]
        this.totalusers = 1
      }
    })
  }

}
