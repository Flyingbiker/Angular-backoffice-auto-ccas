import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenJwt } from '../interface/token';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private username = 'admin';
  // private password = 'admin';
    
  public login : Login|null = null;

  public isAuth = false;
  public isAuthSubject = new Subject<boolean>();

  constructor() { }

  // public compareData(ident : string, pass : string): Boolean{
  //   if (ident === this.username && pass === this.password){
  //     return true;
  //   }
  //   return false;
  // }

  // public signIn(): Promise<Boolean>{    
  //   return new Promise((resolve, reject)=>{
  //     setTimeout(
  //       ()=> {
  //         this.isAuth = true;
  //         resolve(true);
  //       }, 2000
  //     )
  //   })
  // }

  public signOut() : void{
    this.isAuth = false;
    this.emitIsAuthSubject();
  }

  public emitIsAuthSubject() : void {
    return this.isAuthSubject.next(this.isAuth);
  }

}
