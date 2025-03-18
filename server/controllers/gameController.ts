import { Server, Socket } from "socket.io"
import { GameMap, RoomMap } from "../server"
import { Game } from "../classes/Game"
import { Room } from "../classes/Room"
import { Player } from "../classes/Player"
import { Equipment } from "../classes/Equipment"
import positionConfig from "../data/positionConfig.json"

interface PositionConfig{
    position:[][];
    rotation:[][];
    cameraOffset:[][];
}

export const gameController = (io:Server,socket:Socket)=>{
    socket.on("create-game",({roomCode})=>{
        const room = <Room>RoomMap.get(roomCode)
        if(!room) return
        const numberOfPlayers = room.getUsers().length.toString();
        const config = <PositionConfig>positionConfig[numberOfPlayers as keyof typeof positionConfig]
        const players = room.getUsers().map((user,index)=>{
            const playerEquipments = new Equipment()
            const playerConfig = {
                position:config.position[index],
                rotation:config.rotation[index],
                cameraOffset:config.cameraOffset[index],
            }
            const player = new Player(index,user,index == 0,3,playerEquipments,playerConfig);
            return player
        })
        const newGame = new Game(roomCode,players);
        GameMap.set(roomCode,newGame)
        console.log("Created Game",newGame)
        io.to(room.getRoomId()).emit("game-started",{newGame})
    })
}