export class Equipment {
    healing: number;
    doubleDamage: number;
    shield: number;
    doubleTurn: number;
    lookNextBullet: number;

    constructor(){
        this.healing = 0;
        this.doubleDamage = 0;
        this.shield = 0;
        this.doubleTurn = 0;
        this.lookNextBullet = 0;
    }

    addEquipment(equipment:string){
        switch(equipment){
            case "healing":
                this.healing++;
                break;
            case "doubleDamage":
                this.doubleDamage++;
                break;
            case "shield":
                this.shield++;
                break;
            case "doubleTurn":
                this.doubleTurn++;
                break;
            case "lookNextBullet":
                this.lookNextBullet++;
                break;
        }
    }

    useEquipment(equipment:string){
        switch(equipment){
            case "healing":
                this.healing--;
                break;
            case "doubleDamage":
                this.doubleDamage--;
                break;
            case "shield":
                this.shield--;
                break;
            case "doubleTurn":
                this.doubleTurn--;
                break;
            case "lookNextBullet":
                this.lookNextBullet--;
                break;
        }
    }

}