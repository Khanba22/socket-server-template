import { IEquipment } from './Equipment';

export interface IPlayer {
    id: number;
    name: string;
    isHost: boolean;
    lives: number;
    isDead: boolean;
    equipments: IEquipment;

    addEquipment(equipment: string): void;
    useEquipment(equipment: string): void;
    isAlive(): boolean;
}