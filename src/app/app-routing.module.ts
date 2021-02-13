import { AddAnnonceComponent } from './views/annonces/add-annonce/add-annonce.component';
import { CanActivateGuard } from './services/auth-guard.service';
import { AddGarageComponent } from './views/garages/add-garage/add-garage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnonceDetailComponent } from './views/annonces/annonce-detail/annonce-detail.component';
import { AnnoncesComponent } from './views/annonces/annonces/annonces.component';
import { EditAnnonceComponent } from './views/annonces/edit-annonce/edit-annonce.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditGarageComponent } from './views/garages/edit-garage/edit-garage.component';
import { GarageDetailComponent } from './views/garages/garage-detail/garage-detail.component';
import { GaragesComponent } from './views/garages/garages/garages.component';
import { LoginComponent } from './views/login/login.component';
import { PageFourOFourComponent } from './views/page-four-o-four/page-four-o-four.component';
import { AddUserComponent } from './views/users/add-user/add-user.component';
import { EditUserComponent } from './views/users/edit-user/edit-user.component';
import { UserDetailComponent } from './views/users/user-detail/user-detail.component';
import { UsersComponent } from './views/users/users/users.component';


const routes: Routes = [
  {path:"dashboard", canActivate: [CanActivateGuard], component : DashboardComponent},
  {path:"users", canActivate: [CanActivateGuard], component : UsersComponent},
  {path:"users/user/:id", canActivate: [CanActivateGuard], component : UserDetailComponent},
  {path:"users/edit/:id", canActivate: [CanActivateGuard], component : EditUserComponent},
  {path:"users/add", canActivate: [CanActivateGuard], component : AddUserComponent},
  {path:"garages", canActivate: [CanActivateGuard], component : GaragesComponent},
  {path:"garages/edit/:id", canActivate: [CanActivateGuard], component : EditGarageComponent},
  {path:"garages/garage/:id", canActivate: [CanActivateGuard], component : GarageDetailComponent},
  {path:"garages/add", canActivate: [CanActivateGuard], component : AddGarageComponent},
  {path:"annonces", canActivate: [CanActivateGuard], component : AnnoncesComponent},
  {path:"annonces/edit/:id", canActivate: [CanActivateGuard], component : EditAnnonceComponent},
  {path:"annonces/annonce/:id", canActivate: [CanActivateGuard], component : AnnonceDetailComponent},
  {path:"annonces/add", canActivate: [CanActivateGuard], component : AddAnnonceComponent},
  {path:"", component : LoginComponent},
  {path:'404-page', component : PageFourOFourComponent},
  {path:"**", redirectTo : '404-page'},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
