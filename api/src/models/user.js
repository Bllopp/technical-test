const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Date, model } = require("mongoose");

const MODELNAME = "user";

const Schema = new mongoose.Schema({
  name: { type: String, trim: true },

  email: { type: String, required: true, unique: true, trim: true },

  avatar: { type: String, default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" },
  banner: { type: String, default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" },

  password: {type: String, require: true},

  last_login_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },

  costPerDay: { type: Number },
  sellPerDay: { type: Number },

  days_worked: { type: Number, default: 23 },

  description: { type: String },
  job_title: { type: String },

  status: { type: String, default: "active" },
  availability: { type: String, default: "available" },
  address: { type: String },

  role: { type: String, enum: ["normal", "admin"], default: "normal" },
});


Schema.pre("save", function (next) {
 if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (e, hash) => {
      this.password = hash;
      return next();
    });
  } else {
    return next();
 }
});


Schema.methods.comparePassword = async function comparePassword(p) {
  return match = await bcrypt.compare(p,this.password ||"")
};
const OBJ = mongoose.model(MODELNAME, Schema);
module.exports = OBJ;

