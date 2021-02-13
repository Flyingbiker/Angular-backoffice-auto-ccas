import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public loginSubscription : Subscription|boolean = false;

  constructor(private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.loginSubscription = this.authService.isAuthSubject.subscribe(
      (isAuth : boolean) => {
        this.loginSubscription = isAuth;        
      }
    )
  }

  public onSignOut() : void {
    this.authService.signOut();      
    this.router.navigate(['']);
  }
}
