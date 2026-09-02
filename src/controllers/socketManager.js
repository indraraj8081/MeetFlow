import {Server} from "socket.io"

let connection  ={}
let messages = {}
let timeline = {}

export const connectToSocket = (server) =>{
    const io = new Server(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        socket.on("join-call", (path) => {
            if(!connection[path] ===undefined){
                connection[path] = []
            }
            connection[path].push(socket.id)
            timeOnline[socket.id] = Date.now()

            for (let a = 0; a < connection[path].length; a++) {
                io.to(connection[path][a]).emit("chat-message", messages[path][a]["data"]),
                messages[path][a]["sender", messages[path][a]["socket-id-sender"]] 

            }
        })
    socket.on("signal", (told, message) => {
        io.to(told).emit("signal", socket.id, message)


    })
    socket.on("chat-message", (data , sender) => {
        const [matchingRoom ,found] = Object.entries(connection).reduce(([room, isFound], [roomKey, roomValue]) => {
            if (isFound && roomValue.includes(socket.id)){
                return [roomKey, true];
            }
            return [room, isFound]
        }, [null, false]);
    if (found === true){
        if(!messages[matchingRoom]===undefined){
            messages[matchingRoom] = []
        }
        messages[matchingRoom].push({"sender": sender,"data": data, "socket-id-sender": socket.id})
        console.log("message",key, ":",sender, data)
        
        connection[matchingRoom].forEach((elem) => {
            io.to(elem).emit("chat-message", data, sender, socket.id)
        })
    }
    })

    socket.on("disconnect", () => {
        var diffTime = Math.abs(timeOnline[socket.id] - Date.now())

        var key

        for (const [key, value] of JSON.parse(JSON.stringify(Object.entries(connection)))) {
            for (let a = 0; a < value.length; a++) {
                if (value[a] === socket.id) {
                    key = key
                    for (let a = 0; a < connection[key].length; a++) {
                     io.to(connection[key][a]).emit("user-disconnected", socket.id)
                }
                var index = connection[key].indexOf(socket.id);
                connection[key].splice(index, 1);

                if (connection[key].length === 0) {
                    delete connection[key]
            }


    }}}})

    return io
})};

