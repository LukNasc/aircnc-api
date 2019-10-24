//Express => Auxiliar no desenvolvimento de rotas para o app (micro framework)
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');


const socketio = require("socket.io");
const http = require('http');


const pass = "omnistack";

// mongoose.connect("mongodb+srv://omnistack:"+pass+"@omnistack-kqeq6.mongodb.net/semanaOmnistack?retryWrites=true&w=majority",{
//     useNewUrlParser:true,
//     useUnifiedTopology: true
// });
mongoose.connect('mongodb://localhost:27017/omnistack',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Criando a aplicação
const app = express();
const server = http.Server(app);
const io = socketio(server);
    
const connectedUsers = {};

io.on('connection',socket=>{
    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

app.use((req,res,next)=>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
//Avisando ao express que pode vir requisições json
app.use(express.json());
app.use('/files',express.static(path.resolve(__dirname,'../','uploads')))
app.use(routes);
server.listen(3333);