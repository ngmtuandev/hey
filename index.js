const ioSocket = require("socket.io")(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let userConnet = []

ioSocket.on("connection", (socket) => {

    socket.on("add-user-new", (newUser) => {
        if (!userConnet.some((user) => user.idUser === newUser)) {
            userConnet.push({idUser: newUser, socketId: socket.id });
            console.log("new user add : ", userConnet)
        }
        ioSocket.emit("get-users", userConnet)
    })

    socket.on("send-message", (message) => {
        const {idUserReceive} = message
        const userReceive = userConnet.find((user) => user.idUser === idUserReceive)
        console.log("Send from socket to", idUserReceive, "data send : ", message)
        
        if (userReceive) {
            ioSocket.to(userReceive.socketId).emit("message", message)
        }

    })

    socket.on("disconnect", () => {
        userConnet = userConnet.filter((user) => user.socketId !== socket.id)
        console.log("user after disconnected: ", userConnet)
        ioSocket.emit("get-user", userConnet)
    })

})