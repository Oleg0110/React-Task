const { Schema, model, Types } = require("mongoose")

const taskSchema = new Schema({
   text: { type: String, required: true },
   columnOwner: { type: Types.ObjectId, ref: "Column" },
   projectOwner: { type: Types.ObjectId, ref: "Project" }
})


module.exports = model("Task", taskSchema)