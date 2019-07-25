import { SpentOn } from './spenton';

export interface User{
    id?:string
    email?:string
    username?:string
    credits?:Number
    spenton?:SpentOn
}