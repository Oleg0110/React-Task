const { Schema, model, Types } = require("mongoose")

const taskSchema = new Schema({
   text: { type: String, required: true },
   listOwner: { type: Types.ObjectId, ref: "List" }
})


module.exports = model("Task", taskSchema)