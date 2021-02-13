import { GarageJsonLd } from 'src/app/interface/garage-jsonLd';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  constructor(private httpClient: HttpClient) { }

  public deleteGarage(garage : number): void {
    if (confirm("Etes-vous sur de vouloir supprimer ce garage ?")){
      this.httpClient.delete<GarageJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+garage)
        .subscribe(
          () => {
            alert('suppression du garage confirmé' + garage);            
          },
          (err) => {console.error(err);}          
        )
    }

  }
}
