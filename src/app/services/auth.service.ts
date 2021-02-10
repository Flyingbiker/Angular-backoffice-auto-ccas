import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private identification = 'admin';
  private password = 'password';
  //converti avec bcrypt

  public isAuth = false;

  constructor() { }

  public compareData(ident : string, pass : string): Boolean{
    if (ident === this.identification && pass === this.password){
      return true;
    }
    return false;
  }

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
