import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

// Escucha por si llega un evento connection de algun cliente y si llega (si hay una conexion) ejecuta el codigo
io.on('connection', socket => {
    console.log('Client connected')

    // Recibe un evento message con datos enviados por un cliente (recibe el mensaje)
    socket.on('message', (data) => {
        // Reenvia un evento message con datos (envia el mensaje) a todos los clientes conectados menos a al que envió el mensaje al servidor
        socket.broadcast.emit('message', {
            body: data.body,
            from: data.from,
        });
    });
})

server.listen(3000);
console.log('Server on port ', 3000);

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true // Habilitar el uso de cookies
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);


