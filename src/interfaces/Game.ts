import { IPlayer } from "./Player";

export interface IGame{
    id:string;
    players:IPlayer[];
    currentTurn:number;
    startGame:()=>void;
}