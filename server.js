const express = require('express');
const mongoose = require('mongoose');
const http = require("http");
const { Server } = require("socket.io");

const User = require("./models/User");
const GroupMessage = require("./models/GroupMessage");
const PrivateMessage = require("./models/PrivateMessage");

const SERVER_PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static("public"));
app.use("/view", express.static("views"));


const DB_NAME = "db_comp3133_employee"
const DB_USER_NAME = 'aidanrepchik_db_user'
const DB_PASSWORD = 'VSBs33y6GgMG1fP5'
const CLUSTER_ID = 'gvh8tkd'
const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@cluster0.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(DB_CONNECTION)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));


app.post("/api/signup", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Username already exists" });
    }
});


app.post("/api/login", async (req, res) => {
    const user = await User.findOne(req.body);
    if (!user) return res.status(401).json({ error: "Invalid login" });
    res.json(user);
});

io.on("connection", (socket) => {

    socket.on("joinRoom", (room) => {
        socket.join(room);
    });

    socket.on("leaveRoom", (room) => {
        socket.leave(room);
    });

    socket.on("chatMessage", async (data) => {
        await GroupMessage.create(data);
        io.to(data.room).emit("chatMessage", data);
    });

    socket.on("typing", (room) => {
        socket.to(room).emit("typing");
    });

});


server.listen(SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${SERVER_PORT}`);
});
