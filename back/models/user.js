const { Schema, model, Types } = require("mongoose")
const normalize = require('normalize-mongoose')

const schema = new Schema({
   email: { type: String, required: true, unique: true },
   name: { type: String, required: true, max: 25 },
   password: { type: String, required: true, min: 8 },
   // projects: [{ type: Types.ObjectId, ref: "Project" }]
})

schema.plugin(normalize)

module.exports = model("User", schema)