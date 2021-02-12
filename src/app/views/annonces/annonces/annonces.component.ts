import { AnnoncesCollection } from 'src/app/interface/annonces-collection';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AnnoncesService } from './../../../services/annonces.service';

import { Component, OnInit } from '@angular/core';
import { AnnonceCollectionFilter } from 'src/app/interface/annonce-filter';
import { AnnonceJsonLd } from 'src/app/interface/annonces-jsonLd';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {

  public annoncesArray : Array<AnnonceJsonLd> = [];
  public annonceSubscription : Subscription|null = null;

  public filters : AnnonceCollectionFilter = {
    id : '',
    title : '',
    description : '',
    fuel : '' ,
    price : '' ,
  }
  public page = 1;
  public pageSize = 30;
  public collectionSize :number = 0;


  constructor(private annoncesService : AnnoncesService,
              private router : Router,
              private httpClient : HttpClient) { }

  ngOnInit(): void {
     this.annoncesService.loadPage('/api/listings?page=1').subscribe(
      (collection) => {
        this.collectionSize = collection['hydra:totalItems'];
        this.annoncesArray = collection['hydra:member'];
      }
    );
  }
  
  public applyFilters(page : number = 1):void {
    let url = '/api/listings?page='+page;

    for (const key of Object.keys(this.filters)){
      if (key in this.filters) {
        const val = this.filters[key as keyof AnnonceCollectionFilter];

        if (val !== ''){
          url += '&' + key + '=' + val;
        }
      }
    }
    console.log(url);
    
    this.httpClient.get<AnnoncesCollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com'+url)
    .subscribe(
      (response)=> {
        this.annoncesArray = response['hydra:member'];
      }
    );
  }

  public pageChange(page : number): void{
    if (page !== this.page){
      console.log('page num : '+page);      
      this.annoncesService.loadPage('/api/listings?page='+page).subscribe(
        (collection) => {
          this.collectionSize = collection['hydra:totalItems'];
          this.annoncesArray = collection['hydra:member'];
        }
      );
    }
  }

  public goToDetailAnnonce(index : number = 0){
    this.router.navigate(['/annonces/annonce/'+index]);
  }
  
}
