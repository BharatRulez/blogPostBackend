const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String
    // required: true
  },
  salt: String,
status: {
    type: Number,
    default: 1
  },
  created: {
    type: Date,
    default: Date.now
  },
 updated: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function(next) {
  try {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
    }
    next();
  } catch (error) {
    next(error);
  }
});

//methods
userSchema.methods = {
  authenticate: function(password, hashed_password) {
    return bcrypt.compareSync(password, hashed_password);
  }
};

module.exports = mongoose.model("User", userSchema);
