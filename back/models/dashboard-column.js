const { Schema, model, Types } = require("mongoose")

const columnSchema = new Schema({
   title: { type: String, required: true },
   // tasks: [{ type: Types.ObjectId, ref: "Task" }],
   projectOwner: { type: Types.ObjectId, ref: "Project" }
})


module.exports = model("Column", columnSchema)