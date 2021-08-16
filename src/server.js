import express from "express";
import cors from 'cors'
import listEndpoints from "express-list-endpoints";
import services from './services/index.js'

const port = 3001;

const server = express();

server.use(cors())

server.use(express.json())

server.use('/', services)

console.log(listEndpoints(server))

server.listen(port, () => {
    console.log("server running");
});