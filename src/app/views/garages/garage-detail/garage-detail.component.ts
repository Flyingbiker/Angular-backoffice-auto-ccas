import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GarageJsonLd } from 'src/app/interface/garage-jsonLd';
import { Component, OnInit } from '@angular/core';
import { Garage } from 'src/app/interface/garage';

@Component({
  selector: 'app-garage-detail',
  templateUrl: './garage-detail.component.html',
  styleUrls: ['./garage-detail.component.scss']
})
export class GarageDetailComponent implements OnInit {

  public indexGarage = 0;
  public garageDetail : GarageJsonLd|null = null;

  constructor(private route : ActivatedRoute,
              private httpClient : HttpClient,
              private router :  Router
              ) { }

  ngOnInit(): void {
    this.indexGarage = this.route.snapshot.params['id'];
    this.loadGarageDetails(this.indexGarage);
  }

  public loadGarageDetails(index : number): void {
    this.httpClient.get<GarageJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+index)
      .subscribe(
        (response) => {
          this.garageDetail = response;
        },
        (err) => { console.error(err);
        }
      );
  }

  public deleteGarage(garage : number): void {
    if (confirm("Etes-vous sur de vouloir supprimer ce garage ?")){
      this.httpClient.delete<GarageJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages/'+garage)
        .subscribe(
          (response) => {
            alert('suppression du garage confirmé');
            this.router.navigate(['/garages']);
          },
          (err) => {console.error(err);}          
        )
    }

  }

}
