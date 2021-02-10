import { AnnonceJsonLd } from 'src/app/interface/annonces-jsonLd';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.scss']
})
export class AnnonceDetailComponent implements OnInit {

  public indexAnnonce = 0;
  public annonceDetail : AnnonceJsonLd|null = null;  

  constructor(private route : ActivatedRoute, 
              private httpClient: HttpClient,
              private router :  Router) { }

  ngOnInit(): void {
    this.indexAnnonce = this.route.snapshot.params['id'];
    this.loadAnnonceDetails(this.indexAnnonce);
  }

  public loadAnnonceDetails(index:number): void {
    this.httpClient.get<AnnonceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/'+index)
      .subscribe(
        (response) => {
          this.annonceDetail = response ;          
        },
        (error)=> {
          console.log("le message d'erreur : "+ error);          
        }
      )
  }

  public deleteAnnonce(annonce : number): void {
    if (confirm("Etes-vous sur de vouloir supprimer cete annonce ?")){
      this.httpClient.delete<AnnonceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/'+annonce)
        .subscribe({
          next: (response)=> {
            alert('suppression de l\'annonce confirmée');
            this.router.navigate(['/annonces']);
          },
          error: (err) => {
            console.error(err);            
          }
        });
    }
  }
}
