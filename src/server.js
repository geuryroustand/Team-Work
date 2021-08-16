import express from "express";
import routerReviews from "./reviews/index.js";
import listEndpoints from "express-list-endpoints";
import cors from "cors";

const server = express();

const port = 3001;

server.use(cors());
server.use(express.json());

//Routers

server.use("/reviews", routerReviews);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server running");
});
