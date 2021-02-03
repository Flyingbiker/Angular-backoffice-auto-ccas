import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UserJsonLd } from 'src/app/interface/user-jsonLd';

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
    'phone' :  new FormControl(''),
    'siret' :  new FormControl(''),
    'garages' : new FormControl(''),
    // 'garages' : new FormArray([])
  });

  constructor(private httpClient : HttpClient,
              private router : Router,
              private formBuilder : FormBuilder) {

   }

  ngOnInit(): void {

    this.httpClient.post<UserJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/users',{
    });
  }
  
  public onSubmitAddUser() : UserJsonLd | void { 
    this.addUser = this.addUserForm.value;
    console.log(this.addUser,  this.addUserForm);    

    this.router.navigate(['users'])
  }

}
