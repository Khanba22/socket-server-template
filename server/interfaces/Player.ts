import { EquipmentInterface } from './Equipment';
export interface Player{
    id:number;
    name:string;
    isHost:boolean;
    lives:number;
    equipments:EquipmentInterface;
}

