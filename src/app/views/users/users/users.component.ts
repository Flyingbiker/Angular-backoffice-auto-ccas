import { UserJsonLd } from './../../../interface/user-jsonLd.d';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usercollection } from 'src/app/interface/user-collection';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public usersArray : Array<UserJsonLd> = [];

  constructor( private httpClient:HttpClient ) {   }
  
  ngOnInit(): void {
    //après le get les <> permet de préciser le type de données que l'on 
    //récupère. Cela permet ensuite l'autocomplétion
    this.httpClient.get<Usercollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users?page=1')
      .subscribe(
        (response)=>{ this.usersArray = response['hydra:member'];
          //ou solution 2 avec une boucle for (mais plus longue)
          //for (const user of response['hydra:member']){
          //   this.usersArray.push(user);            
          // }
          // console.log(this.usersArray);          
        },
        (error)=> {console.log('il y a eu une erreur de connexion ' + error);
        }
      );
  }

}
