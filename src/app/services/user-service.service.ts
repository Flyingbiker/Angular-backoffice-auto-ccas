import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interface/user';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  public userSubject = new Subject<User[]>();
  
  constructor(private httpClient:HttpClient) {
    
   }

}
