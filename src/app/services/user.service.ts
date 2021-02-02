import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interface/user';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userArray : Array<User> = [];
  public usersSubject = new Subject<User>();

  constructor(private httpClient : HttpClient) {   }

  public  getUsersFromServer(){
    let url = "https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages?page=1";
    this.httpClient
      .get<User[]>(url).subscribe((response)=> {
          this.userArray = response;
          //rajouter l'eventEmitter pour l'observable          
        }, 
        (error) => {
          console.log('erreur de chargement ' + error);
          
        }
      )
  }
}
