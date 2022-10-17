import express from "express";
import { client } from "../index.js";

const router = express.Router();

router.get("/",async (request,response)=>{
    const rooms = await client.db("hallBooking").collection("bookRooms").find().toArray();
    response.send(rooms);
})

export const customersRouter = router;