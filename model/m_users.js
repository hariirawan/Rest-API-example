const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true
  }
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
