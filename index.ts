import express from 'express';
import { AdminRoute, VandorRoute } from './routes';
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_URI } from './config';

// Create express app
const app = express();

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/admin", AdminRoute );
app.use("/vandor", VandorRoute);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  } as ConnectOptions)
  .then(result =>{
    console.log("DB connected!");
  }).catch(err=>{
    console.log('error'+err);
  })

app.listen(8000, ()=>{
    console.log("App is listening");
})