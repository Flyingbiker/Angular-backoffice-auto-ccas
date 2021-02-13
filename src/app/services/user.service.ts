
import { Router } from '@angular/router';
import { UserJsonLd } from 'src/app/interface/user-jsonLd';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GarageService } from './garage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usersListPage : number|null = null;
  public usersList : Array<UserJsonLd> = [];

  public usersListSubject = new Subject<UserJsonLd[]>() ;

  constructor(private httpClient : HttpClient,
              private router: Router,
              private garageService : GarageService) {   }
 
  public emitUsersListSubject(): void {
    this.usersListSubject.next(this.usersList.slice());
  }

  public deletUser(user : UserJsonLd|null):void {
    if (user !== null) {
      if (confirm("Etes-vous sur de vouloir supprimer ce professionnel ?")) {   
        const garageToDelete = user.garages;
        console.log(garageToDelete);
        if (garageToDelete !== undefined) {
          for (let i=0 ; i < garageToDelete?.length ; i++){
            console.log(garageToDelete[i]);
            const regex = /api\/garages\/([0-9]+)/
            const indexGarage = garageToDelete[i].match(regex);
            if (indexGarage !== null ){              
              console.log('garage à supprimer'+ parseInt(indexGarage[1]));
              this.garageService.deleteGarage(parseInt(indexGarage[1]));
            }
            
          }
        }
        this.httpClient.delete('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/'+user.id)
          .subscribe(
            () => {            
              alert('suppression confirmé');
              this.router.navigate(['/users']);            
            },
            (error) => {console.error('erreur sur la requête de suppression' + error);
            }
          );
      }
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
