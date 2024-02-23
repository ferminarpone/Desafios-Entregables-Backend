export default class UsersDto{
    constructor(user, amount){
        this.name = `${user.first_name} ${user.last_name}`;
        this.email = user.email;
        this.amount = amount;
    }
}