import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddUserComponent } from './views/users/add-user/add-user.component';
import { UserDetailComponent } from './views/users/user-detail/user-detail.component';
import { UsersComponent } from './views/users/users/users.component';

import { GaragesComponent } from './views/garages/garages/garages.component';
import { GarageDetailComponent } from './views/garages/garage-detail/garage-detail.component';
import { EditGarageComponent } from './views/garages/edit-garage/edit-garage.component';
import { EditUserComponent } from './views/users/edit-user/edit-user.component';
import { AnnoncesComponent } from './views/annonces/annonces/annonces.component';
import { AnnonceDetailComponent } from './views/annonces/annonce-detail/annonce-detail.component';
import { EditAnnonceComponent } from './views/annonces/edit-annonce/edit-annonce.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { PageFourOFourComponent } from './views/page-four-o-four/page-four-o-four.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    UserDetailComponent,
    UsersComponent,
    GaragesComponent,
    GarageDetailComponent,
    EditGarageComponent,
    EditUserComponent,
    AnnoncesComponent,
    AnnonceDetailComponent,
    EditAnnonceComponent,
    DashboardComponent,
    LoginComponent,
    PageFourOFourComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
