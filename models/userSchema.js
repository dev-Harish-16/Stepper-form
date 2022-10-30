const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, "userName is required!"], unique: true },
    mobile: { type: Number, required: [true, "MobileNumber is required!"] },
    email: { type: String, required: [true, "email is required!"], unique: true },
    password: { type: String, required: [true, "password is required!"] },
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model("userCollection", userSchema)