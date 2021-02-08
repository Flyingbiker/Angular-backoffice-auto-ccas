import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserJsonLd } from 'src/app/interface/user-jsonLd';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public btnName : string = 'Modifier';
  public userToModify : UserJsonLd|null = null;

  constructor(private activatedRoute : ActivatedRoute,
              private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) =>{ 
        console.log('params : ' , params);
        console.log('params : ' , params.id);
        this.httpClient.get<UserJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/'+params.id)
          .subscribe( {
            next: (data : UserJsonLd)=> { 
              this.userToModify = data 
              console.log(this.userToModify);
              
            },
            error : (err : HttpErrorResponse)=> { console.error('Erreur de requête + ', err); }
          }
        )
      }
    )
  }

}
