import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/router';
import config from './config';
const http = require("http");


const app = express();
const port = config.PORT;

app.get('/', function (req, res) {
    res.status(200).send("<h1>API</h1>");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', router);

const server = http.createServer(app);

server.listen(port, () => console.log(`Server on port: ${port}`));
