import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { port,apiVersion } from './config/sconfig.js';
import { sequelize } from './connectDb/dbPostgres.js';
import apiRouter from './router/index.js';
// import { stripeController } from './controller/index.js';

const app = express()

//cors to let browser access the hosted backend
app.use(cors({
    origin : '*',
    methods : 'GET, POST, PUT, PATCH, DELETE',
    credentials : true
}));

// WebHook route
// app.post("/webhook",bodyParser.raw({ type : 'application/json'}),stripeController.handleWebhook)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : false
}))

app.use(`${apiVersion}`,apiRouter)

app.get('/',(req,res) => {
    res.send('HomePage')
})

const initApp = async() => {
    console.log("Testing the database connection..............");
    try{
        await sequelize.authenticate();
        console.log("Connection has been established successfully....");
        app.listen(port,() => {
            console.log(`Server is running at:http://localhost:${port}`);
        })
    } catch (error){
        console.error("Unable to connect to the database:",error);
    }
}

initApp()