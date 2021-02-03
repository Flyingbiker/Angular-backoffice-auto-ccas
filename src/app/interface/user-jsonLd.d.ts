//interface user refaite pendant le cours
export interface UserJsonLd {
    //le ' permet de mettre l'@ dans l'attribut
    '@context'	: string;
    '@id' : string;
    '@type' : string;
    id	: Number;  
    lastName : string;
    firstName : string;
    email:string;
    //le ? permet de mettre l'attribu comme optionnel et donc d'être à null
    phone? : string ;
    siret? : string;
    garages : Array<string>;
}