//interface user refaite pendant le cours
export interface UserJsonLd {
    //le ' permet de mettre l'@ dans l'attribut
    '@context'	: String;
    '@id' : String;
    '@type' : String;
    id	: Number;  
    lastName : String;
    firstName : String;
    email:String;
    //le ? permet de mettre l'attribu comme optionnel et donc d'être à null
    phone? : String ;
    siret? : String;
    garages : Array<String>;
}