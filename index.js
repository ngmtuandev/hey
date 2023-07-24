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
            // console.log("new user add =================== : ", userConnet)
        }
        ioSocket.emit("get-users", userConnet)  
    })

    socket.on("disconnect", () => {
        userConnet = userConnet.filter((user) => user.socketId !== socket.id)
        ioSocket.emit("get-user", userConnet)
    })

    socket.on("send-message", (message) => {
        // console.log('mesageeeeeeeeeeee: ', message)
        const {idUserReceive} = message

        const userReceive = userConnet.find((user) => user.idUser === idUserReceive) // tìm thiết bị đang hoạt động
        console.log("gửi đến id", idUserReceive, "dữ liệu gửi : ", message, 'thông tin nhận: ', userReceive)
        if (userReceive) {
            ioSocket.to(userReceive.socketId).emit("recevied-message", message)
        }
    })

    

})