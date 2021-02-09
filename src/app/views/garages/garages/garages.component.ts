import { Router } from '@angular/router';
import { GarageCollectionFilter } from './../../../interface/garage-filters.d';
import { GarageCollection } from './../../../interface/garage-collection.d';
import { GarageJsonLd } from './../../../interface/garage-jsonLd.d';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-garages',
  templateUrl: './garages.component.html',
  styleUrls: ['./garages.component.scss']
})
export class GaragesComponent implements OnInit {

  public garageArray : Array<GarageJsonLd> = []; 

  public prevLink : string |null = null;
  public nextLink : string |null = null;

  public lastPage : number |null = null;
  public actualPage : string = "/api/garages?page=1";

  public filters : GarageCollectionFilter = {
    name : '',
    postalCode : '',
    city : ''
  }

  constructor(private httpClient : HttpClient,
              private router : Router) { }

  ngOnInit(): void {
    this.loadPage(this.actualPage);
  }

  public loadNextPage(): void {
    if (this.nextLink !== null){
      this.loadPage(this.nextLink);
      this.actualPage = this.nextLink;
    }
  }
  public loadPreviousPage(): void {
    if (this.prevLink !== null){
      this.loadPage(this.prevLink)
      this.actualPage = this.prevLink;
    }
  }

  public applyFilters(page : number = 1) : void {
    
    let url = '/api/garages?page='+page;

    for (const key of Object.keys(this.filters)){
      if (key in this.filters){
        const val = this.filters[key as keyof GarageCollectionFilter];

        if (val !== ''){
          url += '&' + key + '=' + val;
        }
      }
    }
    this.loadPage(url);
  }

  public loadPageByNumber(pageNumber : number) : void {
    this.applyFilters(pageNumber);
  }

  public get getPageNumber(): Array<number>{
    const arr :Array<number> = [];
    
    if (this.lastPage !== null){
      for (let i=1; i <= this.lastPage; i++){
        arr.push(i);
      }
    }
    return arr;
  }
  
  
  public loadPage(page : string):void {
    this.httpClient.get<GarageCollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com'+page)
      .subscribe(
        (response) => { 
          this.garageArray = response['hydra:member'];
          

          if (response['hydra:view']['hydra:next'] === undefined){
            this.nextLink = null;
          } else {
            this.nextLink = response['hydra:view']['hydra:next'];
          }

          if (response['hydra:view']['hydra:previous'] === undefined) {
            this.prevLink = null;
          } else {
            this.prevLink = response['hydra:view']['hydra:previous'];
          }

          if (response['hydra:view']['hydra:last'] === undefined){
            this.lastPage = null;
          } else {
            const regex = /\?.*page=([0-9]+)/;
            const str = response['hydra:view']['hydra:last'];

            //la méthode match permet de comparer la regex avec la string
            //ça donne un tableau avec en 2° index le retour de ce qui est entre ()
            const matches = str.match(regex);

            if (matches === null) {
              this.lastPage = null;
            } else {
              this.lastPage = parseInt(matches[1]);
            }
            this.actualPage = page;
          }
        },
        (error) => {console.log('Echec de la requette : ' + error);
        }
      );    
  }

  public goToDetailGarage(index:number = 0) : void {
    this.router.navigate(['garages/garage/'+index]);
  }

  public deleteGarage(index:number): void {    
    if (confirm('Etes-vous sur de vouloir supprimer ce garage ?')) {
      this.httpClient.delete<GarageJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+index)
        .subscribe(
          (data) => {
            alert("suppression confirmée !"); 
            this.loadPage(this.actualPage)  ;         
          },
          (error)=> {
            console.error('erreur lors de la suppression', error);
          }          
        );
    }
  }

}
