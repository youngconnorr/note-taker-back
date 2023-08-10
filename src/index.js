import express from "express"; //framework to create api
import cors from "cors"; // allows for communication of front/back end (no error for api call)
import mongoose from "mongoose"; //connects to the database

const app = express();

app.use(express.json())//whenever you get data from front it converts to json
app.use(cors()); //fixes tons of issues of api requets from front end

mongoose.connect("mongodb+srv://connoryoung4:ZY8S4pB0NywB6faM@note-taker.crxiubo.mongodb.net/note-taker?retryWrites=true&w=majority")



app.listen(3001, () => console.log("LISTENING"))