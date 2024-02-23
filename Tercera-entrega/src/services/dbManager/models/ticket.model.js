import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const autoGenerateCode = ()=>{
return uuidv4();
}

const ticketSchema = new Schema({
    code: {type: String, default: autoGenerateCode(), unique: true},
    purchase_datetime: {type: Number}, 
    amount: {type: Number},
    purchaser: {type: String}
})

const ticketModel = model("Tickets", ticketSchema);

export { ticketModel }