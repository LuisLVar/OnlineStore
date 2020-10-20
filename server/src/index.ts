import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as socketio from 'socket.io';
import { createServer, Server } from 'http';

import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';
import portadaRoutes from './routes/portadaRoutes';
import loginRoutes from './routes/loginRoutes';
import productRoutes from './routes/productRoutes';
import imagenRoutes from './routes/imagenRoutes';

class Server1 {
    public app: Application;
    public server: Server;
    public io: SocketIO.Server;


    constructor() {
        this.app = express();
        this.config();
        this.server = createServer(this.app);
        this.io = socketio.default(this.server);
        this.routes();
    }
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/users', userRoutes);
        this.app.use('/api/portada', portadaRoutes);
        this.app.use('/api/login', loginRoutes);
        this.app.use('/api/products', productRoutes);
        this.app.use('/api/image', imagenRoutes);
    }

    start(): void {
        this.server.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });

        this.io.on('connect', (socket: any) => {
            console.log('user connected');

            // // socket.on('new-message', (message:any) => {
            // //     console.log(message);
            // //     this.io.emit(message);
            // //   });


            // //Nuevo usuario en socket
            // socket.on('join', (data: any) => {
            //     socket.join('active');
            // });

            // //Usuario abandono la sala
            // socket.on('leave', (data: any) => {
            //     //console.log(data.user + ' left the room');
            //     //this.cambiarEstado(data.user, 0);
            //     socket.broadcast.to('active').emit('left room', { user: data.user, message: 'has left this room' });
            //     socket.leave(data.user);
            //     socket.leave('active');
            // });

            // //Nuevo mensaje
            // socket.on('message', (data: any) => {
            //     this.saveMsj(data);
            //     socket.broadcast.to('active').emit('newmessage', { user: data.emisor, dest: data.destino, message: data.msj });
            // });
            // //Nuevo mensaje
            // socket.on('new-message', (data: any) => {
            //     //this.saveMsj(data);
            //     console.log(data);
            //     //socket.broadcast.to('active').emit('new-message',{msg:data.msg});
            //     this.io.emit(data);
            // });

        });
    }

}
const server = new Server1();
server.start();
