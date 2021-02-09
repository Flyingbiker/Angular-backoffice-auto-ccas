import { Usercollection } from 'src/app/interface/user-collection';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserJsonLd } from 'src/app/interface/user-jsonLd';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public totalPros :number|null = null;
  public arrayLastFivePros : Array<UserJsonLd> = [];

  public totalGarages :number|null = null;
  public arrayLastFiveGarages : Array<UserJsonLd> = [];

  public totalAnnonces :number|null = null;
  public arrayLastFiveAnnonces : Array<UserJsonLd> = [];

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Usercollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users?page=1&order%5Bid%5D=desc')
      .subscribe(
        (result)=> { 
          this.totalPros = result['hydra:totalItems'];
          let arrayTemp = result['hydra:member'];
          for (let i=0; i<5; i++){
            this.arrayLastFivePros.push(arrayTemp[i]);
          }
        },
         (err) => {console.error(err);
        }
      );
    this.httpClient.get<Usercollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/garages?page=1')
      .subscribe(
        (result)=> { 
          this.totalGarages = result['hydra:totalItems'];

        },
          (err) => {console.error(err);
        }
      );
    this.httpClient.get<Usercollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings?page=1')
      .subscribe(
        (result)=> { 
          this.totalAnnonces = result['hydra:totalItems'];         

        },
        (err) => {console.error(err);
        }
      );
    
  }

}
