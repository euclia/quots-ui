import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatFormFieldModule, MatInputModule, MatTooltipModule, MatDialogModule, MatTableModule, MatSlideToggleModule, MatDividerModule, MatPaginatorModule } from '@angular/material';
import {CookieService} from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginService } from './api/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrordialogComponent } from './dialogs/errordialog/errordialog.component';
import { DialogsService } from './dialogs/dialogs.service';
import { AppsComponent } from './apps/apps.component';
import { AddappComponent } from './addapp/addapp.component';
import { EditappComponent } from './editapp/editapp.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { UsersComponent } from './users/users.component';
import { EdituserComponent } from './edituser/edituser.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrordialogComponent,
    AppsComponent,
    AddappComponent,
    EditappComponent,
    ConfirmComponent,
    UsersComponent,
    EdituserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDividerModule,
    MatPaginatorModule,
    // MatModule
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  entryComponents:[
    ErrordialogComponent,ConfirmComponent
  ],
  providers: [CookieService,DialogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
