import express from "epxress";
import {createServer} from "node:http";
import mongoose, { mongo } from 'mongoose';
import {server} from "socket-io";
import cors from "cors";
import {connectToSocket} from "./controllers/socketManager.js";
import {user} from "./Models/usermodels.js";


const app = express;
const Server = createServer(app);
const io =connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended : true}));



const start = async ()=>{
    const connectiondb = await mongoose.connect("mongodb+srv://singhindraraj66_db_user:5y4NTFpHiRPqcHwe@cluster0.eu9osv4.mongodb.net/?appName=Cluster0")
    console.log(`mongodb connected DB host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"),()=>{
        console.log("listining on port 8000")
    });

}



start();

