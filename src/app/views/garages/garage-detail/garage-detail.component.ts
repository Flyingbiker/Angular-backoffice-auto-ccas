import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GarageJsonLd } from 'src/app/interface/garage-jsonLd';
import { Component, OnInit } from '@angular/core';
import { Garage } from 'src/app/interface/garage';
import { GarageService } from 'src/app/services/garage.service';

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
              private router :  Router,
              private garageService : GarageService
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
    this.garageService.deleteGarage(garage);
    this.router.navigate(['/garages']);    

  }

}
