import { Router } from '@angular/router';
import { UserJsonLd } from 'src/app/interface/user-jsonLd';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usersListPage : number|null = null;
  public usersList : Array<UserJsonLd> = [];

  public usersListSubject = new Subject<UserJsonLd[]>() ;

  constructor(private httpClient : HttpClient,
              private router: Router) {   }
 
  public emitUsersListSubject(): void {
    this.usersListSubject.next(this.usersList.slice());
  }

  public deletUser(id : number):void {
    if (confirm("Etes-vous sur de vouloir supprimer ce professionnel ?")) {      
      this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/'+id)
        .subscribe(
          (response) => {            
            alert('suppression confirmé');
            this.router.navigate(['/users']);            
          },
          (error) => {console.error('erreur sur la requête de suppression' + error);
          }
        );
    }
  }

  public goToGarage(garage : string) : void {
    const regex = /api\/garages\/(.+)/;
    const routeCorrected = garage.match(regex);
    if (routeCorrected !== null){
      this.router.navigate(['garages/garage/'+ routeCorrected[1]]);
    }    
  }

  
}
