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

  constructor() { }

  ngOnInit(): void {
  }

}
