import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import services from "./services/index.js";
import { publicJSONPath } from "./utils/fs-utils.js";
import routerReviews from "./reviews/index.js";

const port = 3001;


const server = express();

server.use(cors());
server.use("/", express.static(publicJSONPath));
server.use(express.json());


server.use(cors());
server.use(express.json());

//Routers

server.use("/reviews", routerReviews);
server.use("/", services);

console.table(listEndpoints(server));

server.listen(port, () => {
    console.log("server running");
});