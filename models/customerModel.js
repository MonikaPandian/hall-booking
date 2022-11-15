import { Double } from 'mongodb';
import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    custName: { type: String, required: true},
    date:{ type: String, required: true},
    startTime: { type: Number, required: true},
    endTime: { type: Number, required: true}
},
{timestamps: true}
);

var CustomerModel = mongoose.model("customers", customerSchema)
export default CustomerModel