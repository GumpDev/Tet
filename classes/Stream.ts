import { readFileSync } from 'fs';

export default class Stream{
    public static io : any;
    public static serverHandles : any = {};
    
    constructor(port){
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const expressApp = require("express")();
        const https = require("https");
        const secureServer = https.createServer({
            key: readFileSync('./server.key'),
            cert: readFileSync('./server.cert'),
            ca: readFileSync('./ca.key')
        }, expressApp);

        const io = require("socket.io")(secureServer, {
            cors: {
              origin: '*',
            }
        });
        io.on('connection', (socket) => {
            socket.on("setServer",server=>{
                if(!Stream.serverHandles[server]) Stream.serverHandles[server] = [];
                Stream.serverHandles[server].push(socket);

                socket.on("disconnect",()=>{
                    const i = Stream.serverHandles[server].indexOf(socket);
                    Stream.serverHandles[server].splice(i,1);
                })
            })
        });
        Stream.io = io;

        secureServer.listen(port, () => {
            console.log(`Stream Socket is listening in ${port}`);
        })
        return this;
    }

    static send(serverId,data){
        Stream.serverHandles[serverId].forEach(s=>{
            s.emit("dice",JSON.stringify(data));
        })
    }
}