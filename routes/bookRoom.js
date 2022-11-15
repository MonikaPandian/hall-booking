import express from "express";
import { client } from "../index.js";
import { ObjectId } from 'mongodb';
import CustomerModel from "../models/customerModel.js";

const router = express.Router();

router.post("/:id", async (request, response) => {
    const roomId = request.params;
    const newCustomer = new CustomerModel(request.body)
    const { custName, date, startTime, endTime } = newCustomer

    const res = await client.db("hallBooking").collection("rooms").findOne({ _id: ObjectId(roomId) })
    if (res) {
        const res2 = await client.db("hallBooking").collection("bookRooms").findOne({ roomId: roomId.id, date: date, startTime: startTime, endTime: endTime })
        if(res2){
            return response.status(400).send({ message: "Room with the given time slot has already been booked" })
        }
        var allowbooking = true;
        const res1 = await client.db("hallBooking").collection("bookRooms").find({ roomId: roomId.id, date: date }).toArray()
              
        res1.forEach((room)=> {  
            if((startTime > room.startTime) && (startTime < room.endTime) || (endTime > room.startTime) && (endTime < room.endTime)){
                allowbooking = false;          
            }  
            if((room.startTime > startTime) && (room.startTime < endTime) || (room.endTime > startTime) && (room.endTime < endTime)){
                allowbooking = false;          
            }                
        })
        if(allowbooking){
            const result = await client.db("hallBooking").collection("bookRooms").insertOne({ custName: custName, date: date, startTime: startTime, endTime: endTime, roomId: roomId.id, status: "Booked" });    
            return response.status(200).send({ message: "Room booked successfully"});
        }else{
            return response.status(400).send({ message: "Room with the given time slot has already been booked" });
        }
    }
    else {
        response.send({ message: "Room is not available" })
    }
})

export const bookRoomRouter = router;

