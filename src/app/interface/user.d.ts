export interface User{
    firstName: string;
    lastName: string;
    email: string;    
    phone? : string ;
    siret? : string;
    garages? : Array<string>;
}