import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AnnonceJsonLd } from 'src/app/interface/annonces-jsonLd';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Annonce } from 'src/app/interface/annonce';
import { variable } from '@angular/compiler/src/output/output_ast';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-annonce-form',
  templateUrl: './annonce-form.component.html',
  styleUrls: ['./annonce-form.component.scss']
})
export class AnnonceFormComponent implements OnInit {

  @Input() btnName : string = '';

  public addAnnonce : Annonce|null = null;

  //getter mis pour pouvoir afficher les messages d'erreur
  get title(){ return this.editAnnonceForm.get('title');}
  get description() {return this.editAnnonceForm.get('description')}
  get releaseYear() {return this.editAnnonceForm.get('releaseYear')}
  get km() {return this.editAnnonceForm.get('km')}
  get price() {return this.editAnnonceForm.get('price')}
  get brand() {return this.editAnnonceForm.get('brand')}
  get model() {return this.editAnnonceForm.get('model')}
  get fuel() {return this.editAnnonceForm.get('fuel')}
  get garage() {return this.editAnnonceForm.get('garage')}
  
   //pour afficher les données lors de l'ouverture du formulaire
  public annonceModel = {
    title : this.annonce?.title,
    description:this.annonce?.description,
    releaseYear:this.annonce?.releaseYear,
    km:this.annonce?.km,
    price:this.annonce?.price,
    brand:this.annonce?.brand,
    model:this.annonce?.model,
    fuel:( this.annonce?.fuel !== null ? this.annonce?.fuel : null),
    garage:this.annonce?.garage,
  }

  //setter pour récupérer les informations à la création du composant
  @Input() 
  set annonce(annonceModel: Annonce|null) {
    if (annonceModel?.title) {
      this.editAnnonceForm.get('title')?.setValue(annonceModel.title);
    }
    if (annonceModel?.description) {
      this.editAnnonceForm.get('description')?.setValue(annonceModel.description);
    }
    if (annonceModel?.releaseYear) {
      this.editAnnonceForm.get('releaseYear')?.setValue(annonceModel.releaseYear);
    }
    if ( annonceModel?.km ){
      this.editAnnonceForm.get('km')?.setValue(annonceModel.km);
    }
    if (annonceModel?.price) {
      this.editAnnonceForm.get('price')?.setValue(annonceModel.price);
    }
    if (annonceModel?.brand) {
      this.editAnnonceForm.get('brand')?.setValue(annonceModel.brand);
    }
    if (annonceModel?.model) {
      this.editAnnonceForm.get('model')?.setValue(annonceModel.model);
    }
    if (annonceModel?.fuel) {
      this.editAnnonceForm.get('fuel')?.setValue(annonceModel.fuel);
    }
    if (annonceModel?.garage) {
      this.editAnnonceForm.get('garage')?.setValue(annonceModel.garage);
    }    
  }

  public editAnnonceForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    releaseYear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    km: ['', Validators.required],
    price: ['', Validators.required],
    brand: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    model: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
    fuel: [null, [Validators.minLength(2), Validators.maxLength(255)]],
    garage: ['', Validators.required]
  });

  constructor(private formBuilder:FormBuilder,
              private httpClient : HttpClient,
              private router : Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  public onSubmit(postOrPatch : string) :  Observable<Annonce>|void { 
    const annonce = this.editAnnonceForm.value as Annonce;
    this.addAnnonce = {
        title : annonce.title,
        description : annonce.description,
        releaseYear :  annonce.releaseYear,
        km :  annonce.km,
        price :  annonce.price,
        brand :  annonce.brand,
        model :  annonce.model,
        fuel :  annonce.fuel,
        garage :  annonce.garage
    }

    if (postOrPatch === 'Ajouter'){
      this.httpClient.post<AnnonceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings', 
      this.addAnnonce).subscribe(
        (response) => {
          
          this.router.navigate(['annnonces/annonce/'+response.id])

        },
        (error) => {console.log('erreur de la requète : '+ error);
        }
      );
      
    } else if (postOrPatch === 'Modifier'){
      const id = this.activatedRoute.params.subscribe(
        (data)=> {
          this.httpClient.put<AnnonceJsonLd>('https://hb-bc-dwwm-2020.deploy.this-serv.com/api/listings/'+data.id,
          this.addAnnonce).subscribe(
            () => {
              console.log('annnonces/annonce/'+data.id);
              
              this.router.navigate(['annonces/annonce/'+data.id]);

            },
            (error) => {console.log('erreur de la requète : ', error);
            });          
        }
      )
    }
  }
}
