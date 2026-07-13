import express from "epxress";
import {createServer} from "node:http";
import mongoose from 'mongoose';

import {server} from "socket-io";

import cors from "cors";

const app = express;

app.get('/home',(req,res)=>{
    return res.json({'hello':"world"})
});

const start = async ()=>{
    app.listen(8000,()=>{
        console.log("listining on port 8000")
    });

}

start();

