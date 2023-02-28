import express from 'express';
import { AdminRoute, VandorRoute } from './routes';
import bodyParser from 'body-parser';

// Create express app
const app = express();

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/admin", AdminRoute );
app.use("/vandor", VandorRoute );

app.listen(8000, ()=>{
    console.log("App is listening");
})