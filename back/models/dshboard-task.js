const { Schema, model, Types } = require("mongoose")
const normalize = require('normalize-mongoose')

const taskSchema = new Schema({
   text: { type: String, required: true },
   columnOwner: { type: Types.ObjectId, ref: "Column" },
   projectOwner: { type: Types.ObjectId, ref: "Project" }
})

taskSchema.plugin(normalize)

module.exports = model("Task", taskSchema)