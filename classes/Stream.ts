export default class Stream{
    public static io : any;
    public static serverHandles : any = {};
    
    constructor(port){
        const io = require("socket.io")(port, {
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
        return this;
    }

    static send(serverId,data){
        Stream.serverHandles[serverId].forEach(s=>{
            s.emit("dice",JSON.stringify(data));
        })
    }
}