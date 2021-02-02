import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth = false;

  constructor() { }

  public signIn(): Promise<Boolean>{
    return new Promise((resolve, reject)=>{
      setTimeout(
        ()=> {
          this.isAuth = true;
          resolve(true);
        }, 2000
      )
    })
  }

  public signOut() : Boolean{
    return this.isAuth = false
  }
}
