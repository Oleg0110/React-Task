const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")

app.use(express.json())
app.use(cors({
   origin: "http://localhost:3000"
}))

app.use("/projects", require("./routes/projects"))

app.use("/dashboards", require("./routes/dashboards"))

app.use("/user", require("./routes/users"))

app.use("/user-auth", require("./routes/user-auth"))

const asyncStart = async () => {
   try {
      await mongoose.connect("mongodb+srv://Oleg:1234567890@react.9fxwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
         useNewUrlParser: true
      })
      app.listen(5000, () => {
         console.log("Start on port 5000.....");
      })

   } catch (error) {
      console.log(error);
   }

}


asyncStart()