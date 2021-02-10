import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  public loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  get email() {return this.loginForm.get('email')};
  get password() {return this.loginForm.get('password')};

  constructor(private authService :AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }
  public onSignIn() : void {  
    if (this.email !== null && this.password !==null){
      if ( this.authService.compareData(this.email.value, this.password.value) ){
        this.authService.isAuth = this.authStatus = true;
        this.router.navigate(['dashboard']) ;
      } else {
        alert('couple login / mot de passe incorrect');
      }
    }
       
    // this.authService.signIn().then(
    //   ()=>{
    //     console.log('signin successful ! ');
    //     this.authStatus = this.authService.isAuth;      
    //     this.router.navigate(['dashboard'])  
    //   }
    // )
  }
}
