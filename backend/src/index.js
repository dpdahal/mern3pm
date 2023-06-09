import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import webRouter from "./router/index.js";
import connection from "./config/connection.js";
import Seeder  from "./seeder/index.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// set public folder
app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

connection().then((res) => {
    console.log(res.message);
}).catch((err) => {
    console.log(err.message)
});

new Seeder().run();

app.use("/", webRouter);

let port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
