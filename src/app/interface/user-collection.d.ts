import { UserJsonLd } from './user-jsonLd.d';

export interface Usercollection {
    'hydra:member' : Array<UserJsonLd>;
    'hydra:totalItems' : number;
    'hydra:view' : {
        '@id' : string;
        '@type' : string;
        'hydra:first' : string;
        'hydra:last' : string;
        'hydra:next' : string;
    };
// en attente de tout à l'h
    // 'hydra:search' : {
    //     '@type' : string;        
    //     'hydra:template' : string;
    //     'hydra:variableRepresentation' : string;
    //     'hydra:mapping' : Array<Object>;
    // }
}