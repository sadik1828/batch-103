const mongoose = require("mongoose");

// SCHEMA 

const userSchema = mongoose.Schema ({
email: {
    type: String,
    unique: true,
    required: true,
    trim: true
},

password: {
    type: String,
    required: true,
}, 

name: {
    type: String,
    required: true,
},

role:{
type: String,
enum:["user", "owner"],
default: "user",
}
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
