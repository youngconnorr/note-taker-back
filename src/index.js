import express from "express"; //framework to create api
import cors from "cors"; // allows for communication of front/back end (no error for api call)
import mongoose from "mongoose"; //connects to the database

const dotenv = require('dotenv').config();
const dbURL = process.env.DATABASE_URL;


const app = express();

app.use(express.json())//whenever you get data from front it converts to json
app.use(cors()); //fixes tons of issues of api requets from front end

mongoose.connect(dbURL)



app.listen(3001, () => console.log("LISTENING"))