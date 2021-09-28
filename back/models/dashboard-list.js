const { Schema, model, Types } = require("mongoose")

const listSchema = new Schema({
   title: { type: String, required: true },
   tasks: [{ type: Types.ObjectId, ref: "Task" }],
   projectOwner: { type: Types.ObjectId, ref: "Project" }
})


module.exports = model("List", listSchema)