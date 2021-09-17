const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
   title: { type: String, max: 25, required: true },
   content: { type: String, required: true },
})

module.exports = model("Project", schema)