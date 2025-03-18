import { Equipment } from './Equipment';

interface PositionConfig{
    position:[];
    rotation:[];
    cameraOffset:[];
}

export class Player{
    id:number;
    name:string;
    isHost:boolean;
    lives:number = 3;
    isDead:boolean = false;
    equipments:Equipment;
    position:[];
    rotation:[];
    cameraOffset:[]
    
    constructor(id:number, name:string, isHost:boolean, lives:number, equipments:Equipment,config:PositionConfig){
        this.id = id;
        this.name = name;
        this.isHost = isHost;
        this.lives = lives;
        this.equipments = equipments;
        this.position = config.position;
        this.rotation = config.rotation;
        this.cameraOffset = config.cameraOffset;
    }

    addEquipment(equipment:string){
        this.equipments.addEquipment(equipment);
    }

    useEquipment(equipment:string){
        this.equipments.useEquipment(equipment);
    }

    setRotation(rotation:[]){
        this.rotation = rotation;
    }

    isAlive(){
        return this.lives > 0;
    }


}