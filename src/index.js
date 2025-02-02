import Dotenv from "dotenv";
import { app } from "./app.js";
import dbConnect from './db/index.js'
Dotenv.config({
    path: './.env',
});

const port = process.env.PORT || 8000;
dbConnect()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at ${port}`);
    })
})
.catch((err)=>{
    console.log('mongodb connection error',err);
});