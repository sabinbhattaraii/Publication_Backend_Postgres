import express from 'express';
import bodyParser from 'body-parser';

const app = express()

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