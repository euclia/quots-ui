import { Injectable } from '@angular/core';
import { ErrordialogComponent } from './errordialog/errordialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class DialogsService {

  constructor(
    private dialogs: MatDialog
  ) { }


  public onError(error:HttpErrorResponse){
    let dialogRef: MatDialogRef<ErrordialogComponent>;
    dialogRef = this.dialogs.open(ErrordialogComponent);
    dialogRef.componentInstance.error = error.error;
    // dialogRef.componentInstance.details = errorReport.details;
    // dialogRef.componentInstance.message = errorReport.message;
    return dialogRef.afterClosed();
  }

  public confirmDialog(message:string, confirmationAction:string){
    let dialogRef: MatDialogRef<ConfirmComponent>;
    dialogRef = this.dialogs.open(ConfirmComponent);
    dialogRef.componentInstance.confirmMessage = message
    dialogRef.componentInstance.confirmationAction = confirmationAction
    return dialogRef.afterClosed();
  }

}
