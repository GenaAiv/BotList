const mongoose = require("mongoose");

const BotListSchema = new mongoose.Schema({
  botLogo: {
    type: Buffer,
    contentType: String
  },
  botName: {
    type: String,
    default: ""
  },
  points: {
    type: Number,
    default: 0
  },
  diff: {
    type: Number,
    default: null
  }
});

module.exports = mongoose.model("BotList", BotListSchema);
