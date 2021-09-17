const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
   email: { type: String, required: true, unique: true },
   name: { type: String, required: true, max: 25 },
   password: { type: String, required: true, min: 8 },
   links: { type: Types.ObjectId, ref: "Link" }
})

module.exports = model("User", schema)