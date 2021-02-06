import { Router } from '@angular/router';
import { AnnoncesService } from './../../../services/annonces.service';

import { Component, OnInit } from '@angular/core';
import { AnnonceCollectionFilter } from 'src/app/interface/annonce-filter';
import { AnnonceJsonLd } from 'src/app/interface/annonces-jsonLd';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss']
})
export class AnnoncesComponent implements OnInit {

  public annoncesArray : Array<AnnonceJsonLd> = [
    {
      title : 'string',
      description : 'string',
      releaseYear : 'string',
      km : 0,
      price : 'string',
      brand : 'string',
      model : 'string',
      garage : 'string',
    }
  ];
  public filters : AnnonceCollectionFilter = {
    id : 0,
    title : '',
    description : '',
    fuel : '' ,
    price : '' ,
  }

  constructor(private annoncesService : AnnoncesService,
              private router : Router) { }

  ngOnInit(): void {
    this.annoncesArray = this.annoncesService.loadPage('/api/listings?page=1');
  }

  public applyFilters():void {

  }

  
}
