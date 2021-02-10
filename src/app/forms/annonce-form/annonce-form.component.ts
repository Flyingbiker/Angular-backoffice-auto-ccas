import { AnnonceJsonLd } from 'src/app/interface/annonces-jsonLd';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Annonce } from 'src/app/interface/annonce';

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.scss']
})
export class AnnonceFormComponent implements OnInit {

  @Input() btnName : string = '';
  
  @Input() annonce : Annonce|null = null;

  public editAnnonceForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    releaseYear: ['', Validators.required],
    km: ['', Validators.required],
    price: ['', Validators.required],
    brand: ['', Validators.required],
    model: ['', Validators.required],
    fuel: [''],
    garage: ['', Validators.required]
  });

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    // this.updateAnnonce();
    // console.log(this.annonce);
    
  }

  public updateAnnonce(): void{
    if (this.annonce !== null ) {
      this.editAnnonceForm.patchValue(this.annonce);
      console.log(this.editAnnonceForm);
      
    }
  }

  public onSubmit(btnName : string){

  }
}
