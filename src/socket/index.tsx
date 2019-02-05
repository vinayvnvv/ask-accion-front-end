import io from 'socket.io-client';
const env = require('./../env.json');
class SocketClass {
    private socket: any;
    public connected: boolean = false;
    public userConnected: boolean = false;
    constructor() {
        const socketUrl: string = ((location.hostname === "localhost" || location.hostname === "127.0.0.1") ? env.host.socket : env.host.socketProd);
        this.socket = io(socketUrl);
        // this.socket.on('connection', () => {
        //     this.connected = this.userConnected = true;
        // })
    }
    onMessage(callback: any) {
        this.socket.on('message', (body) => {
            callback(body);
        })
    }
    emitMessage(body: any) {
        this.socket.emit('message', body);
    }
}

export const Socket = new SocketClass();
