import { UserService } from 'src/app/services/user.service';
import { Usercollection } from 'src/app/interface/user-collection';
import { UserJsonLd } from 'src/app/interface/user-jsonLd';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public indexUser = 0;
  public userDetail : UserJsonLd|null = null;

  constructor(private route : ActivatedRoute, 
              private httpClient: HttpClient,
              private userService: UserService) { }

  ngOnInit(): void { 
    this.indexUser = this.route.snapshot.params['id'];
    this.loadUserDetails(this.indexUser);
  }

  public loadUserDetails(index : number): void {
    this.httpClient.get<UserJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/'+index)
      .subscribe(
        (response)=>{
          this.userDetail = response;
          console.log(this.userDetail);
          
         },
        (error)=> {
          console.log("le message d'erreur : "+ error);          
        }
      )        
  }
  public deleteUser(user : number): void {
    this.userService.deletUser(user);
  }
    
}
