const exp = require("express")
const feedBackApp = exp.Router()
const FeedBack = require("../models/feedBackSchema")
const expressAsyncHandler = require("express-async-handler")
const nodemailer = require('nodemailer');
const multer = require('multer');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'layne.thompson@ethereal.email',
        pass: 'BCkr4jbC63G6zpJfSu'
    }
});

// **multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/')
    },
    filename: (req, file, callBack) => {
        callBack(null, `saved_${file.originalname}.${file.mimetype.split("/")[1]}`)
    }
})

let upload = multer({ storage: storage })


// POST-Feedback
feedBackApp.post('/comments', upload.array('files', 5), expressAsyncHandler(async (req, res) => {

    const data = JSON.parse(req.body.formobjValue)
    //** receiving files From multer
    const totalFiles = req.files;
    // console.log(data);
    // console.log(totalFiles);
    const fileArray = [];
    totalFiles.forEach((fileObj) => {
        fileArray.push(fileObj.originalname)
        // console.log(fileObj);
    })
    //** creating fileURl key in req obj-(data)
    data.fileUrl = fileArray

    // ** mail Trigger - if reply is "yes"
    if (data.reply == "yes") {
        console.log(data.email);
        transporter.sendMail({
            from: 'layne.thompson@ethereal.email', // sender address
            to: data.email, // list of receivers
            subject: "Thanks for your feedback!", // Subject line
            text: "We apperciate your feedback, and thank you for flying Delta", // plain text body
            html: "<h1>We apperciate your feedback, and thank you for flying Delta</h1>", // html body
        });

    }
    const saveData = await new FeedBack(data).save()
    res.send({ message: "Data Saved Successsfully", payload: saveData })
}))


feedBackApp.use((req, res, next) => {
    res.send({ message: `This ${req.url} not found. please verify the URL in routes` })
})

feedBackApp.use((err, req, res, next) => {
    res.send({ message: "Error!", payload: err.message })
})

module.exports = feedBackApp




