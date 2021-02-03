import { GarageJsonLd } from './garage-jsonLd.d';

export interface GarageCollection {
    'hydra:member' : Array<GarageJsonLd>;
    'hydra:totalItems' : Number;
    'hydra:view' : {
        '@id' : String;
        '@type' : String;
        'hydra:first' : String;
        'hydra:last' : String;
        'hydra:next' : String;
    };
}