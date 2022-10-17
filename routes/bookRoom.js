import express from "express";
import { client } from "../index.js";
import { ObjectId } from 'mongodb'

const router = express.Router();

router.post("/:id", async (request, response) => {
    const roomId = request.params;
    const { custName, date, startTime, endTime } = request.body;
    const res = await client.db("hallBooking").collection("rooms").findOne({ _id: ObjectId(roomId) })
    if (res) {
        const res1 = await client.db("hallBooking").collection("bookRooms").findOne({ date: date, startTime: startTime, endTime: endTime })
        if (res1){
            response.send({ message: "Room with the given time slot has already been booked" })
        } 
        else {
            const result = await client.db("hallBooking").collection("bookRooms").insertOne({ custName, date, startTime, endTime, roomId: roomId.id, status: "Booked" })
            response.send(result);
        }
    }
    else {
        response.send({ message: "Room is not available" })
    }

})

export const bookRoomRouter = router;