import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public usersArray: Array<User> = [];

  constructor() { 
    for (let i=0; i<10; i++){
      this.usersArray.push({
        firstName : 'firstName'+i,
        lastName : 'lastName'+i,
        city : 'city'+i,
        country : 'country'+i,
        actualOccupation : 'actualOccupation'+i,
        previousOccupation : 'previousOccupation'+i,
        email : 'email'+i,
        phoneNumber : 'phoneNumber'+i,
        creationDate : new Date('2019/'+i+'/'+(i+1)*2),
      })
    }
  }
  

  ngOnInit(): void {
  }

}
