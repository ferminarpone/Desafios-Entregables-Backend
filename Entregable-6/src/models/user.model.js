import { Schema, model} from "mongoose";

const collection = 'users';

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String 
})

const userModel = model(collection, userSchema)

export { userModel };