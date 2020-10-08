import mongoose from 'mongoose';

// userSchema-> define how user will be saved in the mongodb database, its consist of the properties name with their data type 
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true, dropDups: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false}
});

const userModel = mongoose.model("User", userSchema); //1st argument "User" is a collection, 2nd argument is the userSchema

export default userModel;
