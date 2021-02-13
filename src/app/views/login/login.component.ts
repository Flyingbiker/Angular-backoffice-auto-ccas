import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login } from 'src/app/interface/login';
import { TokenJwt } from 'src/app/interface/token';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login : Login ={
    username : '', 
    password : ''    
  } ;

  public authStatus : Boolean | undefined;
  public loginForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });

  get username() {return this.loginForm.get('username')};
  get password() {return this.loginForm.get('password')};

  constructor(private authService :AuthService,
              private router : Router,
              private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
  }
  public onSignIn() : void {  
    if (this.username !== null && this.password !==null){
      this.login.username = this.username.value;
      this.login.password = this.password.value;
      console.log(this.login);      

      this.httpClient.post<Login>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/login', this.login)
        .subscribe(
          (response)=> {
            console.log(typeof(response), response) ;            
               
            this.authService.login = response;      
            this.authService.isAuth = this.authStatus = true;        
            this.router.navigate(['dashboard']) ;

            this.authService.emitIsAuthSubject();

          },
          (err)  => {
            alert('erreur lors de la connexion : ' + err);
            console.error(err);}
        );
      }

  }
}
