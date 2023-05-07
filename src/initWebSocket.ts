import { Server as HttpServer} from "http"
import { Server, Socket } from "socket.io";


export default function initWebSocket(server: HttpServer) {
    const io = new Server(server, {});

    io.use((socket, next) => {
        const headers = socket.handshake.headers;

        if(!headers.server) {
            next(new Error('Disconnected - no server id!'))
        }

        next();
      })
    .on('connection', (socket: Socket) => {
        const request = socket.handshake;

        socket.on('message', function(message) {
            io.emit('message', "return");
            console.log("Received: "+message)
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    return io;
}