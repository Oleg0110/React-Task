console.log("suka");

const express = require("express");
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors({
   origin: "http://localhost:3000"
}))

app.use("/projects", require("./routes/projects"))

app.use("/dashboards", require("./routes/dashboards"))

app.use("/user", require("./routes/users"))

app.listen(5000, () => {
   console.log("Start on port 5000.....");
})