import express from "express";
import { client } from "../index.js";

const router = express.Router();

router.post("/",async (request,response)=>{
    const bookRoom = request.body;
    const result = await client.db("hallBooking").collection("bookRooms").insertOne(bookRoom)
    response.send(result);
})

export const bookRoomRouter = router;