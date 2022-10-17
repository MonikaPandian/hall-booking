import express from "express";
import { client } from "../index.js";


const router = express.Router();

router.post("/",async(request,response)=>{
    const newRoom = request.body;
    const result = await client.db("hallBooking").collection("rooms").insertOne(newRoom)
    response.send(result)
})

router.get("/",async (request,response)=>{
    const rooms = await client.db("hallBooking").collection("rooms").find().toArray();
    response.send(rooms);
})

export const roomRouter = router;