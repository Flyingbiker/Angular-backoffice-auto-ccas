import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserJsonLd } from 'src/app/interface/user-jsonLd';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public addUser : UserJsonLd|null = null;
  public addUserForm = new FormGroup({
    'lastName' : new FormControl('', [Validators.required]),
    'firstName' :  new FormControl('', [Validators.required]),
    'email' :  new FormControl('', [Validators.email]),
    'phone' :  new FormControl('+33', Validators.minLength(10)),
    'siret' :  new FormControl('', Validators.minLength(13)),
    // 'garages' : new FormControl(''),
    'garages' : new FormArray([] )
  });

  constructor(private httpClient : HttpClient,
              private router : Router,
              private formBuilder : FormBuilder) {

   }

  ngOnInit(): void {  }
  
  public onSubmitAddUser() : Observable<UserJsonLd> | void { 
    const user = this.addUserForm.value as UserJsonLd;
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

    
  }

}
