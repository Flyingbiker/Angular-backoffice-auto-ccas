import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AnnonceJsonLd } from 'src/app/interface/annonces-jsonLd';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.scss']
})
export class EditAnnonceComponent implements OnInit {

  public btnName : string = 'Modifier';
  public annonceToModifiy :AnnonceJsonLd|null = null;

  constructor(private activatedRoute : ActivatedRoute,
              private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.httpClient.get<AnnonceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/'+params.id)
          .subscribe( {
            next: (data : AnnonceJsonLd) => {
              this.annonceToModifiy = data;
            },
            error : ( err : HttpErrorResponse) => { console.error(err);
            }
          } )
      }
    )
  }

}
