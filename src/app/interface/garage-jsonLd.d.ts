export interface GarageJsonLd {
    '@context' : string;
    '@id' : string;
    '@type' : string;
    id : number;
    name : string;
    street :string;
    streetComplement? :string;
    postalCode? :string;
    city? :string;
    owner :string;
}