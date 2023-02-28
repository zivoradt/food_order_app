import express from 'express';

const app = express();

app.use("/", (req, res)=>{
    return res.json("Hello from the Food Delivery app");
})

app.listen(8000, ()=>{
    console.log("App is listening");
})