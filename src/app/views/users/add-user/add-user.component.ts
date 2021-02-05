import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public btnName : string = 'Ajouter';

  constructor() {   }

  ngOnInit(): void {  } 
  

}
