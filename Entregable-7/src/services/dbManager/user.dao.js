import { userModel } from "./models/user.model.js";


class UserDao{
    async getUser(condition){
        return await userModel.findOne(condition);
    }

    async getUserById(id, cart){
        return await userModel.findById(id).populate(cart)
    }
    
    async createUser(user){
        return await userModel.create(user);
    }
}

export default new UserDao();