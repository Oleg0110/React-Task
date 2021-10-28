const { Schema, model, Types } = require("mongoose")
const normalize = require('normalize-mongoose')

const schema = new Schema({
   title: { type: String, max: 25, required: true },
   content: { type: String, required: true },
   userOwner: { type: Types.ObjectId, ref: "User" },
   userEmail:{type:String, required:true},
   // column: [{ type: Types.ObjectId, ref: "Column" }],
   //  addUsers: [{"id": String}],
})

schema.plugin(normalize)

module.exports = model("Project", schema)