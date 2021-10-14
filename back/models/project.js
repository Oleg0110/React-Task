const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
   title: { type: String, max: 25, required: true },
   content: { type: String, required: true },
   // column: [{ type: Types.ObjectId, ref: "Column" }],
   userOwner: { type: Types.ObjectId, ref: "User" }
})

module.exports = model("Project", schema)