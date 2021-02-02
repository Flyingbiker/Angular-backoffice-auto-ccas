import { DashboardComponent } from './../dashboard/dashboard.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public authStatus : Boolean | undefined;

  constructor(private authService :AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }
  public onSignIn() : void {
    this.authService.signIn().then(
      ()=>{
        console.log('signin successful ! ');
        this.authStatus = this.authService.isAuth;      
        this.router.navigate(['dashboard'])  
      }
    )
  }
}
