import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  confirmMessage:string
  confirmationAction:string
  constructor(
    public thisDialogRef: MatDialogRef<ConfirmComponent>
  ) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close(true);
  }
  
  onCloseCancel() {
    this.thisDialogRef.close(false);
  }


}
