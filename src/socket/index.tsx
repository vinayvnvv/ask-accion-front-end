import io from 'socket.io-client';
import { Auth } from './../services';
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
        //     this.emitInit(Auth.getAuth().email);
        // })
    }
    onMessage(callback: any) {
        this.socket.on('message', (body) => {
            callback(body);
        })
    }
    onInit(callback: any) {
        this.socket.on('init', (body) => {
            callback(body);
        })
    }
    emitInit(email: string) {
        const obj: any = {emailId: email};
        this.socket.emit('init', obj);
    }
    emitMessage(body: any) {
        body['emailId'] = Auth.getAuth().email;
        this.socket.emit('message', body);
        console.log('emitting msg: ', body);
    }
}

export const Socket = new SocketClass();
