import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserJsonLd } from 'src/app/interface/user-jsonLd';
import { User } from 'src/app/interface/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() btnName: string = '';
  // @Input() user: UserJsonLd|null = null;

  public addUser : User|null = null;
    
  //getter mis pour pouvoir afficher les messages d'erreur
  get lastName() {return this.addUserForm.get('lastName');}
  get firstName() {return this.addUserForm.get('firstName');}
  get email() {return this.addUserForm.get('email');}
  get phone() {return this.addUserForm.get('phone');}
  get siret() {return this.addUserForm.get('siret');}
  get garages() {return this.addUserForm.get('garages');}

  //pour afficher les données lors de l'ouverture du formulaire
  public userModel = {
    lastName : this.user?.lastName,
    firstName : this.user?.firstName ,
    email : this.user?.email ,
    phone : (this.user?.phone !== null ? this.user?.phone : ''),
    siret : (this.user?.siret !== null ? this.user?.siret : ''),
    garages : this.user?.garages
  }
  //setter pour récupérer les informations à la création du composant
  @Input()
  set user(userModel: User|null) {
    if (userModel?.firstName) {
      this.addUserForm.get('firstName')?.setValue(userModel.firstName);
    }

    if (userModel?.lastName) {
      this.addUserForm.get('lastName')?.setValue(userModel.lastName);
    }

    if (userModel?.email) {
      this.addUserForm.get('email')?.setValue(userModel.email);
    }
  }
  
  public addUserForm = new FormGroup({
    lastName : new FormControl(this.userModel.lastName, [Validators.required, 
                                      Validators.minLength(2),
                                      Validators.maxLength(255)
                                    ]),
    firstName :  new FormControl('', [Validators.required, 
                                      Validators.minLength(2),
                                      Validators.maxLength(255)
                                    ]),
    email :  new FormControl('', [Validators.email, 
                                    Validators.required,
                                    Validators.minLength(5),
                                    Validators.maxLength(255)
                                  ]),
    phone :  new FormControl('+33', [Validators.minLength(5),
                                      Validators.maxLength(20)
                                    ]),
    siret :  new FormControl('', [Validators.minLength(14), Validators.maxLength(14)]),
    // 'garages' : new FormControl(''),
    garages : new FormControl(''), 
    // garages : new FormArray([new FormControl('') ])
  }); 

  constructor(private httpClient : HttpClient,
    private router : Router,
    private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    console.log(this.user);
  
  }

  public onSubmit(postOrPatch : string) : Observable<User> | void { 
    const user = this.addUserForm.value as User;
    this.addUser = {
      lastName : user.lastName,
      firstName :  user.firstName,
      email :  user.email,
      phone : user.phone ,
      siret :  user.siret,
    // 'garages' : new FormControl(''),
      garages: user.garages ? user.garages : []
    }
    // this.addUser = this.addUserForm.value;
    // console.log(this.addUser,  this.addUserForm); 

    if (postOrPatch === 'Ajouter'){
      console.log('méthode post');
      this.httpClient.post<UserJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users',
        this.addUser).subscribe(
          (response) => {console.log(response);
            
            const id = response.id;
            console.log(id);
            
            this.router.navigate(['users/user/'+id])
          },
          (error) => {console.log('erreur de la requète : '+ error);
          }
          );
          
      } else if (postOrPatch === 'Modifier') { 
        console.log('méthode Patch');
        
        // this.httpClient.past<UserJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users',
        //   this.addUser).subscribe(
        //     (response) => {console.log(response);
              
        //       const id = response.id;
        //       console.log(id);
              
        //       this.router.navigate(['users/user/'+id])
        //     },
        //     (error) => {console.log('erreur de la requète : '+ error);
        //     });
      }
    }

}
