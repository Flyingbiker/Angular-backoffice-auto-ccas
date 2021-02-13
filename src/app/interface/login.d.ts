import { TokenJwt } from './token.d';

export interface Login {
    username: string,
    password: string ,
    token? : TokenJwt  
}