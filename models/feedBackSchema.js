const mongoose = require("mongoose")

const feedBackSchema = new mongoose.Schema({
    airlineProgram: { type: String, },
    frequentFlyers: { type: String },
    firstName: { type: String,  },
    middleName: { type: String },
    lastName: { type: String, },
    countryCode: { type: String, },
    phoneNumber: { type: String, },
    email: { type: String, },
    country: { type: String,  },
    state: { type: String, },
    city: { type: String,},
    address1: { type: String,},
    address2: { type: String },
    postalCode: { type: Number, },
    confirmationNumber: { type: Number },
    ticket: { type: Number },
    dateOfFlight: { type: Date, default: Date },
    origin: { type: String },
    destination: { type: String },
    flightName: { type: String },
    flightNumber: { type: Number },
    textArea: { type: String,},
    reply: { type: String,  },
    fileUrl: { type: Array }

})

module.exports = mongoose.model("feedBackCollection", feedBackSchema)