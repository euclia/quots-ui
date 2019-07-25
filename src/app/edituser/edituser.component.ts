import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../api/users.api.service';
import { DialogsService } from '../dialogs/dialogs.service';
import { User } from '../models/user';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  userid:string
  user:User

  addCredits:Number
  addedCredits:boolean = false;
  savebutton:boolean = true;
  objectKeys = Object.keys;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private dialogsService:DialogsService,
    private usersApi:UsersService
  ) { }

  ngOnInit() {
    this.savebutton = true;
    this.addedCredits = false;
    delete this.addCredits
    this.userid= this.route.snapshot.params['id'];
    this.usersApi.getUserById(this.userid).subscribe((user:User)=>{
      this.user = user
    })
  }

  onCreditsInput(event){
    this.addCredits = Number(event.target.value)
    this.savebutton = false;
  }

  addCreditsB(){
    this.addedCredits = true
    this.user.credits = this.user.credits.valueOf() + this.addCredits.valueOf()
  }

  saveUser(){
    if(this.addedCredits === false){
      this.user.credits = this.user.credits.valueOf() + this.addCredits.valueOf()
    }
    this.dialogsService.confirmDialog("Users credits will now be: " + this.user.credits, "CONFIRM").subscribe(res=>{
      if(res != false){
        this.usersApi.updateUsersCredits(this.user).subscribe(res =>{
          this.dialogsService.confirmDialog("Users credits updated", "OK")
          this.router.navigate(['/users'])
        })
      }
    })
  }

  cancel(){
    this.ngOnInit()
  }

}
