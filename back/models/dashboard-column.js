const { Schema, model, Types } = require("mongoose")
const normalize = require('normalize-mongoose')

const columnSchema = new Schema({
   title: { type: String, required: true },
   // tasks: [{ type: Types.ObjectId, ref: "Task" }],
   projectOwner: { type: Types.ObjectId, ref: "Project" }
})

columnSchema.plugin(normalize)

module.exports = model("Column", columnSchema)