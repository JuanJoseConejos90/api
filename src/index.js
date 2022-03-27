import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/router';
const http = require("http");

import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.get('/', function (req, res) {
    res.status(200).send("<h1>API</h1>");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server on port: ${port}`));