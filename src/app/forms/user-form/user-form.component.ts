import { Router, ActivatedRoute } from '@angular/router';
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
    phone : (this.user?.phone !== null ? this.user?.phone : null),
    siret : (this.user?.siret !== null ? this.user?.siret : null),
    garages : (this.user?.garages !== null ? this.user?.garages : []), 
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
    if (userModel?.phone) {
      this.addUserForm.get('phone')?.setValue(userModel.phone);
    }
    if (userModel?.siret) {
      this.addUserForm.get('siret')?.setValue(userModel.siret);
    }
    if (userModel?.garages) {
      this.addUserForm.get('garages')?.setValue(userModel.garages);
    }        
  }
  
  public addUserForm = new FormGroup({
    lastName : new FormControl('', [Validators.required, 
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
    // garages : new FormControl(''), 
    garages : this.formBuilder.array([])
  }); 

  public garagesArray() : FormArray { 
    return this.addUserForm.get('garages') as FormArray;
  }

  public onAddGarage() : void{
    const newGarageControl = this.formBuilder.control(null, Validators.required);
    this.garagesArray().push(newGarageControl);
  }

  public onDeleteLastGarage() : void{
    const lengthArray = this.garagesArray().length;
    this.garagesArray().removeAt(lengthArray-1);
  }

  constructor(private httpClient : HttpClient,
    private router : Router,
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {  }

  public onSubmit(postOrPatch : string) : Observable<User> | void { 
    const user = this.addUserForm.value as User;
    this.addUser = {
      lastName : user.lastName,
      firstName :  user.firstName,
      email :  user.email,
      phone : user.phone ,
      siret :  user.siret,  
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
        const id  = this.activatedRoute.params.subscribe(
          (data)=> {
            console.log('méthode Patch',  data.id);
            this.httpClient.put<UserJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users/'+data.id,
              this.addUser).subscribe(
                (response) => {console.log(response);
                  this.router.navigate(['users/user/'+data.id])
                },
                (error) => {console.log('erreur de la requète : ', error);
                });
          }
        );
      }
        
    }

}
