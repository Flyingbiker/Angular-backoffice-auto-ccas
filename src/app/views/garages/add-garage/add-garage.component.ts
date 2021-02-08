import { GarageJsonLd } from './../../../interface/garage-jsonLd.d';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConstraintViolationList } from 'src/app/interface/ConstraintViolationList';
import { Garage } from 'src/app/interface/garage';
@Component({
  selector: 'app-add-garage',
  templateUrl: './add-garage.component.html',
  styleUrls: ['./add-garage.component.scss']
})
export class AddGarageComponent implements OnInit {

  public garage : Garage = {
    name : '',
    street : '',
    streetComplement : '',
    postalCode : '',
    city : '',
    owner : '',
  }

  public violationList : ConstraintViolationList|null = null;

  constructor(private httpClient : HttpClient,
              private router: Router) { }

  ngOnInit(): void {
  }

  public submit(garage : Garage): void {
    this.httpClient.post<GarageJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages', garage)
      .subscribe( {
        next: (createdGarage)=> {
          alert("Garage créé" + createdGarage['@id'] + 'created');

        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 422){
            this.violationList = err.error;
          } else {
            alert(err.status + 'une erreur est arrivé lors de la création');
          }
        }
      });

  }

}
