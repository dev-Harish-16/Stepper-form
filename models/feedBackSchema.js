const mongoose = require("mongoose")

const feedBackSchema = new mongoose.Schema({
    airlineProgram: { type: String },
    frequentFlyers: { type: String },
    firstName: { type: String, required: [true, "firstName is required"] },
    middleName: { type: String },
    lastName: { type: String, required: [true, "lastName is required"] },
    countryCode: { type: String, required: [true, "countryCode is required"] },
    phoneNumber: { type: String, required: [true, "phoneNumber is required"] },
    email: { type: String, required: [true, "email is required"] },
    country: { type: String, required: [true, "phoneNumber is required"] },
    state: { type: String, required: [true, "country is required"] },
    city: { type: String, required: [true, "city is required"] },
    address1: { type: String, required: [true, "address1 is required"] },
    address2: { type: String },
    postalCode: { type: Number, required: [true, "postalCode is required"] },
    confirmationNumber: { type: Number },
    ticket: { type: Number },
    dateOfFlight: { type: Date, default: Date },
    origin: { type: String },
    destination: { type: String },
    flightName: { type: String },
    flightNumber: { type: Number },
    textArea: { type: String, required: [true, "textArea is required"] },
    reply: { type: String, required: [true, "reply is required"] },
    fileUrl: { type: Array }

})

module.exports = mongoose.model("feedBackCollection", feedBackSchema)