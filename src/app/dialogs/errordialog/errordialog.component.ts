import { Component, OnInit } from '@angular/core';
import { ErrorReport } from 'src/app/models/errorReport';

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html',
  styleUrls: ['./errordialog.component.css']
})
export class ErrordialogComponent implements OnInit {

  error:ErrorReport

  constructor() { }

  ngOnInit() {
  }

}
