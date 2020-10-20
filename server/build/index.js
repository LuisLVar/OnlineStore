"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const socketio = __importStar(require("socket.io"));
const http_1 = require("http");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const portadaRoutes_1 = __importDefault(require("./routes/portadaRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const imagenRoutes_1 = __importDefault(require("./routes/imagenRoutes"));
class Server1 {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.server = http_1.createServer(this.app);
        this.io = socketio.default(this.server);
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/users', userRoutes_1.default);
        this.app.use('/api/portada', portadaRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
        this.app.use('/api/products', productRoutes_1.default);
        this.app.use('/api/image', imagenRoutes_1.default);
    }
    start() {
        this.server.listen(this.app.get('port'), () => {
            console.log('Server on port ', this.app.get('port'));
        });
        this.io.on('connect', (socket) => {
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
