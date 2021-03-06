
import { Router } from '@angular/router';
import { UserJsonLd } from './../../../interface/user-jsonLd.d';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usercollection } from 'src/app/interface/user-collection';
import { UsercollectionFilter } from 'src/app/interface/user-filters';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public usersArray : Array<UserJsonLd> = [];
  public prevLink : string |null = null;
  public nextLink : string |null = null;

  public lastPage : number|null = null;

  public filters: UsercollectionFilter = {
    lastName:'',
    firstName:'',
    email:'',    
    siret:'',
  };

  public usersSubscription: Subscription|null = null;

  constructor( private httpClient:HttpClient,
                private router:Router,
                private userService: UserService ) {   }
  
  ngOnInit(): void {
    this.usersSubscription = this.userService.usersListSubject.subscribe(
      (usersArray : Array<UserJsonLd>) => {
        this.usersArray = usersArray;
      }
    )
    //après le get les <> permet de préciser le type de données que l'on 
    //récupère. Cela permet ensuite l'autocomplétion
    this.loadPage('/api/users?page=1');
    // code déplacé dans la méthode loadPage()
    // this.httpClient.get<Usercollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users?page=1')
    //   .subscribe(
    //     (response)=>{ this.usersArray = response['hydra:member'];
    //       //ou solution 2 avec une boucle for (mais plus longue)
    //       //for (const user of response['hydra:member']){
    //       //   this.usersArray.push(user);            
    //       // }
    //       // console.log(this.usersArray);  
          
          
    //       //existe-til une valeur pour le next ? 
    //       if (response['hydra:view']['hydra:next'] !== undefined){
    //         this.nextLink = response['hydra:view']['hydra:next'];
    //       }
    //     },
    //     (error)=> {console.log('il y a eu une erreur de connexion ' + error);
    //     }
    //   );
  }

  public loadNextPage(): void {
    if (this.nextLink !== null) {
     this.loadPage(this.nextLink);
    } 
  }

  public loadPreviousPage() : void {
    if (this.prevLink !== null) {
      this.loadPage(this.prevLink);
     } 
  }

  public loadPageByNumber(pageNumber: number):void{
    this.applyFilters(pageNumber);
    // ('/api/users?page=' + pageNumber);
  }
  
//si pas de valeur en paramètre, par défaut number = 1
  public applyFilters(page: number = 1):void {
    let url = '/api/users?page='+page;

    for (const key of Object.keys(this.filters)){
      if (key in this.filters) {
        const val = this.filters[key as keyof UsercollectionFilter];
  
        if (val !== ''){
          url += '&' + key + '=' + val;
        }
      }
    }
    this.loadPage(url);
  }


  public get getPageNumber(): Array<number> {
    const arr : Array<number> = [];

    if (this.lastPage !== null) {
      for (let i = 1 ; i <=this.lastPage; i++){
        arr.push(i);      
      }
    }
    return arr;
  }

  private loadPage(page : string): void {
    this.httpClient.get<Usercollection>('https://hb-bc-dwwm-2020.deploy.this-serv.com'+page)
      .subscribe(
        (response)=> {
          this.usersArray = response['hydra:member'];
          
          //fonctions pour l'affichage des pages en bas du tableau
          if (response['hydra:view']['hydra:next'] === undefined){
            this.nextLink = null;
          } else {
            this.nextLink = response['hydra:view']['hydra:next'];
          }

          if (response['hydra:view']['hydra:previous'] === undefined) {
            this.prevLink = null;
          } else {
            this.prevLink = response['hydra:view']['hydra:previous'];
          }

          if (response['hydra:view']['hydra:last'] === undefined){
            this.lastPage = null;
          } else {
            const regex = /\?.*page=([0-9]+)/;
            const str = response['hydra:view']['hydra:last'];

            //la méthode match permet de comparer la regex avec la string
            //ça donne un tableau avec en 2° index le retour de ce qui est entre ()
            const matches = str.match(regex);

            if (matches === null) {
              this.lastPage = null;
            } else {
              this.lastPage = parseInt(matches[1]);
            }


            //fonction pour afficher le nom des garages

          }
        }
      );
  }

  public goToDetailUser(index:number = 0){    
    this.router.navigate(['/users/user/'+index]);
  }

  public deleteUser(user : UserJsonLd): void {    
    if (user !== undefined) {
      this.userService.deletUser(user);
    }
  }

  public goToGarage(garage : string) : void {
    this.userService.goToGarage(garage);    
  }

  
}
