import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppsComponent } from './apps/apps.component';
import { AddappComponent } from './addapp/addapp.component';
import { EditappComponent } from './editapp/editapp.component';
import { UsersComponent } from './users/users.component';
import { EdituserComponent } from './edituser/edituser.component';

const routes: Routes = [
  {path: 'applications', component: AppsComponent},
  {path:'applications/add', component: AddappComponent},
  {path: 'applications/:id', component:  EditappComponent},
  {path:'users', component: UsersComponent},
  {path:'users/:id', component: EdituserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
}
