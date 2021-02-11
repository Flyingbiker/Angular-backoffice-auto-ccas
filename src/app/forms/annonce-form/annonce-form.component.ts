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
  
  public annonceModel = {
    title : this.annonce?.title,
    description:this.annonce?.description,
    releaseYear:this.annonce?.releaseYear,
    km:this.annonce?.km,
    price:this.annonce?.price,
    brand:this.annonce?.brand,
    model:this.annonce?.model,
    fuel:this.annonce?.fuel,
    garage:this.annonce?.garage,
  }

  @Input() 
  set annonce(annonceModel: Annonce|null) {
    if (annonceModel?.title) {
      this.editAnnonceForm.get('title')?.setValue(annonceModel.title);
    }
    //get à poursuivre
  } ;

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
    
  }

  public onSubmit(btnName : string){

  }
}
