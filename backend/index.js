import express, { request, response } from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose, { Mongoose } from 'mongoose';
import {Book} from './model/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors'
const app = express();

app.use(cors()); //allow everyone
// app.use(
//     cors({
//         origin:'http://localhost.3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['content-Type'],
//     })
// )

app.use(express.json());

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send("welcome")
});

app.use('/books',booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT,()=>{
            console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch((error)=>{
        console.log(error);
    })
