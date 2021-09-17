const { Schema, model, Types } = require("mongoose")

const taskSchema = new Schema({
   text: { type: String, required: true }
})


module.exports = model("Task", taskSchema)