import { Usercollection } from 'src/app/interface/user-collection';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserJsonLd } from 'src/app/interface/user-jsonLd';
import { GarageJsonLd } from 'src/app/interface/garage-jsonLd';
import { AnnonceJsonLd } from 'src/app/interface/annonces-jsonLd';
import { GarageCollection } from 'src/app/interface/garage-collection';
import { AnnoncesCollection } from 'src/app/interface/annonces-collection';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public totalPros :number|null = null;
  public arrayLastFivePros : Array<UserJsonLd> = [];

  public totalGarages :number|null = null;
  public lastPageGarage : string|null = null;
  public arrayLastFiveGarages : Array<GarageJsonLd> = [];
  public lastGaragesNumber : number|null = null;

  public totalAnnonces :number|null = null;  
  public lastPageAnnonces : string|null = null;
  public arrayLastFiveAnnonces : Array<AnnonceJsonLd> = [];
  public lastAnnoncesNumber : number|null = null;

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Usercollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users?page=1&order%5Bid%5D=desc')
      .subscribe(
        (result)=> { 
          this.totalPros = result['hydra:totalItems'];
          let arrayTemp = result['hydra:member'];
          for (let i=0; i<5; i++){
            this.arrayLastFivePros.push(arrayTemp[i]);
          }
        },
         (err) => {console.error(err);
        }
      );
    this.httpClient.get<GarageCollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages?page=1')
      .subscribe(
        (result)=> { 
          this.totalGarages = result['hydra:totalItems'];
          this.lastPageGarage = result['hydra:view']['hydra:last'];
          this.httpClient.get<GarageCollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com'+this.lastPageGarage)
            .subscribe(
              (response)=> {
                let arrayTemp = response['hydra:member'];
                let len = 0;
                if (arrayTemp.length < 5) {
                  len = arrayTemp.length;
                } else {
                  len = arrayTemp.length-5;
                }
                for (let i=arrayTemp.length-1; i >= len; i--){
                  this.arrayLastFiveGarages.push(arrayTemp[i]);
                } 
                this.lastGaragesNumber = this.arrayLastFiveGarages.length;
              },
              (err) => {console.error(err);}             
            )
        },
          (err) => {console.error(err);
        }
      );

    this.httpClient.get<AnnoncesCollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings?page=1')
      .subscribe(
        (result)=> { 
          this.totalAnnonces = result['hydra:totalItems']; 
          this.lastPageAnnonces = result['hydra:view']['hydra:last'];
          this.httpClient.get<AnnoncesCollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com'+this.lastPageAnnonces)
            .subscribe(
              (response)=> {
                let arrayTemp = response['hydra:member'];
                console.log(arrayTemp);
                
                let len = 0;
                if (arrayTemp.length < 5) {
                  len = arrayTemp.length;
                } else {
                  len = arrayTemp.length-5;
                }
                for (let i=arrayTemp.length-1; i >= len; i--){
                  this.arrayLastFiveAnnonces.push(arrayTemp[i]);
                } 
                this.lastAnnoncesNumber = this.arrayLastFiveAnnonces.length;
              },
              (err) => {console.error(err);}             
            )        

        },
        (err) => {console.error(err);
        }
      );
    
  }

}
