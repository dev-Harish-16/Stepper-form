const exp = require("express")
const userApp = exp.Router()
const User = require("../models/userSchema")
const expressAsyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// POST-Signup
userApp.post("/signup", expressAsyncHandler(async (req, res) => {

    const userData = req.body
    // console.log(userData);
    const hashPassword = await bcrypt.hash(userData.password, 10)
    userData.password = hashPassword
    const user = await new User(userData).save()
    res.send({ message: "User data saved successfully...!", userObj: user })

}))

// POST-Login
userApp.post("/login", expressAsyncHandler(async (req, res) => {
    const userData = req.body
    const userFromDb = await User.findOne({ email: userData.email })
    if (userFromDb) {
        const status = await bcrypt.compare(userData.password, userFromDb.password)
        if (status === true) {
            const token = jwt.sign({ email: userFromDb.email }, process.env.SECRET_KEY, { expiresIn: "1h" })
            res.send({ message: "login Successfull...!", token: token })
        } else {
            res.send({ message: "Password mismatch!!!" })
        }

    } else {
        res.send({ message: "user not found" })
    }

}))

// error handling middlewares
userApp.use((req, res, next) => {
    res.send({ message: `This ${req.url} not found. please verify the URL in routes` })
})

userApp.use((err, req, res, next) => {
    res.send({ message: "Error!", payload: err })
})

module.exports = userApp
