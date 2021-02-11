import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.scss']
})
export class AddAnnonceComponent implements OnInit {

  public btnName : string = 'Ajouter';

  constructor() { }

  ngOnInit(): void {
  }

}
