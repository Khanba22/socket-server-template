import { Server, Socket } from "socket.io"
import { GameMap } from "../server"
import { Game } from "../classes/Game";


export const playerController = (socket:Socket,io:Server) =>{
    socket.on("player-rotation",({newRotation,gameId,playerId})=>{
        const game = <Game>GameMap.get(gameId);
        if(!game) return;
        const player = game.players[playerId]
        player.setRotation(newRotation);
        console.log("Rotated",player,"To",newRotation)
        io.to(game.id).emit("player-rotation",{player})
    })
}