import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConstraintViolationList } from 'src/app/interface/ConstraintViolationList';
import { GarageJsonLd } from 'src/app/interface/garage-jsonLd';
import { Garage } from 'src/app/interface/garage';

@Component({
  selector: 'app-edit-garage',
  templateUrl: './edit-garage.component.html',
  styleUrls: ['./edit-garage.component.scss']
})
export class EditGarageComponent implements OnInit {

  public garage : GarageJsonLd|null = null;
  public violationList : ConstraintViolationList|null = null;

  constructor(private httpClient:HttpClient,
              private activatedRoute:ActivatedRoute,
              private router:Router
            ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      
      (response)=> {
        this.httpClient.get<GarageJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+response.id)
          .subscribe({
            next: (garage : GarageJsonLd) => {
              this.garage = garage;
            },
            error : (err : HttpErrorResponse) => {
              alert(err.status + ' - '+err.statusText);
            }
          });
      }
    )
  }

  public submit(garage : Garage):void {    
    
    this.httpClient.put<GarageJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+this.garage?.id,garage)
      .subscribe({
        next: (createdGarage)=> {
          this.router.navigate(['garages']);
        },
        error: (err: HttpErrorResponse)=> {
          if (err.status === 422){
            this.violationList = err.error;
          } else {
            alert(err.status + 'une erreur est arrivé lors de la création');
          }
        }
      });
  }

}
