const exp = require("express")
const Mongoose = require("mongoose")
const feedbackApi = require("./Api/feedBackApi")
const userApi = require("./Api/userApi")
const app = exp()
const compression = require("compression")
const morgan = require("morgan")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

// MiddleWares
app.use(exp.json())//body-parser
app.use(cors())//cors
app.use(compression())//to compress the size of the response
app.use(morgan('dev'))// logger

// connect angular build with web server
// __dirname ==> returns current directory name
app.use(exp.static(path.join(__dirname, "./dist/airlinesTravel")))

const dbConnectionUrl = process.env.DB_URL

// connect method in mongoose returns promise
Mongoose.connect(dbConnectionUrl)
    .then(() => console.log("DataBase Connected SuccessFully...."))
    .catch(() => console.log("Error Occured in db Connection"))

// routes
app.use("/feedback", feedbackApi)
app.use("/user", userApi)

//catch all other routes and return the index file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './dist/airlinesTravel/index.html'))
})

const port = process.env.PORT || 9000
app.listen(port, () => console.log(`Server Listening on ${port}`))

