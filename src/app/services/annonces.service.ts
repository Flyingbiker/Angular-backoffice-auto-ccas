import { AnnoncesCollection } from './../interface/annonces-collection.d';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AnnonceJsonLd } from './../interface/annonces-jsonLd.d';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {

  private annoncesArray : Array<AnnonceJsonLd> = [];
  
  public AnnoncesSubject = new Subject<AnnonceJsonLd[]>();

  constructor(private httpClient:HttpClient,
              private router:Router ) { }

  public emitAnnoncesSubject(){
    this.AnnoncesSubject.next(this.annoncesArray.slice());
  }

  public loadPage(page: string): Array<AnnonceJsonLd> {
    this.httpClient.get<AnnoncesCollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com'+page)
      .subscribe(
        (response)=> {
          this.annoncesArray = response['hydra:member'];
          this.emitAnnoncesSubject();
         
      }, 
        (error) => {
          console.error('erreur sur la requête Get : '+ error);
        }
      )
    return this.annoncesArray;
  }
}
