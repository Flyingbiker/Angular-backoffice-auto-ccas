import { GarageCollection } from './../../../interface/garage-collection.d';
import { GarageJsonLd } from './../../../interface/garage-jsonLd.d';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.scss']
})
export class GaragesComponent implements OnInit {

  public garageArray : Array<GarageJsonLd> = [];  
  public prevLink : String |null = null;
  public nextLink : String |null = null;

  constructor( private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<GarageCollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages?page=1')
      .subscribe(
        (response) => { 
          this.garageArray = response['hydra:member'];

          //existe-til une valeur pour le next ? 
          if (response['hydra:view']['hydra:next'] !== undefined){
            
          }
        },
        (error) => {console.log('Echec de la requette : ' + error);
        }
      );
  }

}
