import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { port } from './config/sconfig.js';

const app = express()

//cors to let browser access the hosted backend
app.use(cors({
    origin : '*',
    methods : 'GET, POST, PUT, PATCH, DELETE',
    credentials : true
}));

app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send('HomePage')
})

const initApp = async() => {
    try{
        app.listen(port,() => {
            console.log(`Server is running at: http://localhost:${port}`);
        })
    } catch (error){
        console.error("Unable to connect to the database:",error);
    }
}

initApp()