import { UserJsonLd } from './user-jsonLd.d';

export interface Usercollection {
    'hydra:member' : Array<UserJsonLd>;
    'hydra:totalItems' : Number;
    'hydra:view' : {
        '@id' : String;
        '@type' : String;
        'hydra:first' : String;
        'hydra:last' : String;
        'hydra:next' : String;
    };
// en attente de tout à l'h
    // 'hydra:search' : {
    //     '@type' : String;        
    //     'hydra:template' : String;
    //     'hydra:variableRepresentation' : String;
    //     'hydra:mapping' : Array<Object>;
    // }
}