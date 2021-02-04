import { GarageJsonLd } from './garage-jsonLd.d';

export interface GarageCollection {
    'hydra:member' : Array<GarageJsonLd>;
    'hydra:totalItems' : number;
    'hydra:view' : {
        '@id' : string;
        '@type' : string;
        'hydra:first' : string;
        'hydra:last' : string;
        'hydra:next'? : string;
        'hydra:previous'? : string;
    };
}