export interface GarageJsonLd {
    '@context' : String;
    '@id' : String;
    '@type' : String;
    id : Number;
    name : String;
    street? :String;
    streetComplement? :String;
    postalCode? :String;
    city? :String;
    owner :String;
}