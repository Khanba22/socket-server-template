import { Player } from "./Player";

export class Game{
    id:string;
    players:Player[];
    currentTurn:number;
    constructor(id:string, players:Player[]){
        this.id = id;
        this.players = players;
        this.currentTurn = 0;
    }
}