import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    address:{
      street: {type: String},
      city: {type: String},
      state: {type: String},
      zipcode: {type: String},
      country: {type: String},
      phone:{type: String}
    },
    imageUrl:{
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const userModel = mongoose.model("userModel", userSchema);
export default userModel;