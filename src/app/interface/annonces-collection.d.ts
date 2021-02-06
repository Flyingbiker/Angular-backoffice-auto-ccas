import { AnnonceJsonLd } from './annonces-jsonLd.d';

export interface AnnoncesCollection {
    'hydra:member': Array<AnnonceJsonLd>;
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