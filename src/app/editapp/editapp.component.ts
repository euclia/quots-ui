import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../models/applications';
import { AppService } from '../api/app.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DialogsService } from '../dialogs/dialogs.service';

@Component({
  selector: 'app-editapp',
  templateUrl: './editapp.component.html',
  styleUrls: ['./editapp.component.css']
})
export class EditappComponent implements OnInit {

  appid:string
  app:Application

  tempBaseUrl:string
  tempUsageType:string
  addDisabled:boolean = false
  savebutton:boolean = true;


  constructor(
    private route:ActivatedRoute,
    private appService:AppService,
    private router:Router,
    private dialogsService:DialogsService
  ) { }

  ngOnInit() {
    this.appid = this.route.snapshot.params['id'];
    this.appService.getAppById(this.appid).subscribe((app:Application)=>{
      this.app = app
    })
  }

  addBaseUrl(){
    if(typeof this.app.baseURLS === 'undefined'){
      this.app.baseURLS = []
    }
    this.app.baseURLS.push('')
    this.tempBaseUrl = ''
    this.addDisabled = true
  }

  onUrlInput(event){
    this.tempBaseUrl = event.target.value
  }

  addURL(){
    if(typeof this.app.baseURLS === 'undefined'){
      this.app.baseURLS = []
    }
    let emptyIndex = this.app.baseURLS.indexOf('')
    if(emptyIndex > -1){
      this.app.baseURLS[emptyIndex] = this.tempBaseUrl
    }
    this.addDisabled = false;
    this.savebutton = false;
  }

  deleteURL(url){
    let index = this.app.baseURLS.indexOf(url)
    this.app.baseURLS.splice(index, 1)
    this.savebutton = false;
  }

  addUsage(){
    if(typeof this.app.usagetypes === 'undefined' || this.app.usagetypes ===  null){
      this.app.usagetypes = []
      this.app.usagescost = {}
    }
    this.tempUsageType = '' 
    this.app.usagetypes.push('')
  }

  onUsageTypeInput(event){
    this.tempUsageType = event.target.value
  }

  addUsageType(){
    if(typeof this.app.usagetypes === 'undefined' ){
      this.app.usagetypes = []
    }
    let ind = this.app.usagetypes.indexOf(this.tempUsageType)
    this.app.usagetypes.splice(ind, 1)
    this.app.usagescost[this.tempUsageType] = 0
    this.app.usagetypes.push(this.tempUsageType)
    this.tempUsageType = ''
    this.savebutton = false;
  }

  deleteUsage(usage){

    let index = this.app.usagetypes.indexOf(usage)
    this.app.usagetypes.splice(index, 1)
    delete this.app.usagescost[usage]
    this.savebutton = false;
  }

  onUsageCostInput(event, usage){
    this.app.usagescost[usage] = Number(event.target.value)
  }

  saveApp(){
    this.appService.updateApp(this.app).subscribe(app=>{
      this.dialogsService.confirmDialog("Application saved", "OK")
      this.app = app
      this.savebutton = true;
    })
  }

  deleteApp(){
    this.dialogsService.confirmDialog("Application will be deleted", "DELETE").subscribe(res =>{
      if(res != false){
        this.appService.deleteApp(this.app.id).subscribe(res =>{
          this.router.navigate(['/applications'])
        })
      }
    })

  }

  regenerateSecret(){
    this.appService.updateAppSecret(this.appid).subscribe(ap =>{
      this.app = ap
    })
  }

}
