export interface IEquipment {
    healing: number;
    doubleDamage: number;
    shield: number;
    doubleTurn: number;
    lookNextBullet: number;

    addEquipment(equipment: string): void;
    useEquipment(equipment: string): void;
}