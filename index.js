import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { roomRouter } from './routes/createRoom.js'
import { roomsRouter } from './routes/getAllRooms.js'
import { bookRoomRouter } from "./routes/bookRoom.js";
import { customersRouter } from "./routes/getAllCustomers.js";

dotenv.config();
const app = express();
app.use(cors())
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection(){
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("Mongo is connected");
    return client;
}

export const client = await createConnection();
app.use(express.json())

//API endpoints
app.get("/",(request,response)=>{
    response.send("Welcome to Hall Booking")
})

app.use('/create-room',roomRouter)
app.use('/book-room',bookRoomRouter)
app.use('/all-rooms',roomsRouter)
app.use('/all-customers',customersRouter)

app.listen(PORT,() => console.log("Server started on port",PORT));
