import { readFileSync } from "fs";
import { createServer } from 'https';
export default class Stream{
    public static io : any;
    public static serverHandles : any = {};
    
    constructor(port){
        const options = {
            key: readFileSync('./certs/key.pem').toString(),
            cert: readFileSync('./certs/cert.pem').toString()
        }
        const https = createServer(options);
        const io = require("socket.io")(https, {
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
        https.listen(port,()=>{
            console.log(`Stream Socket is listening ${port}`)
        })
        return this;
    }

    static send(serverId,data){
        Stream.serverHandles[serverId].forEach(s=>{
            s.emit("dice",JSON.stringify(data));
        })
    }
}