import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    numberOfSeatsAvailable: { type: Number, required: true},
    amenitiesInRoom: [],
    pricePerHour: Number,   
},
{timestamps: true}
);

var RoomModel = mongoose.model("rooms", roomSchema)
export default RoomModel