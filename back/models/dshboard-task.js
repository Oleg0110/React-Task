const { Schema, model, Types } = require("mongoose")

const taskSchema = new Schema({
   text: { type: String, required: true },
   listOwner: { type: Types.ObjectId, ref: "List" },
   projectOwner: { type: Types.ObjectId, ref: "Project" }
})


module.exports = model("Task", taskSchema)