import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
  }

  public onSignOut() : void {
    this.authService.isAuth = false;      
    this.router.navigate(['']);
  }
}
