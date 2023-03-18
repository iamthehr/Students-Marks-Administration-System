const mongoose = require("mongoose");

const marksSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subject",
  },
  marks: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },

  semester: {
    type: Number,
  },
  batch: {
    type: Number,
    require: true,
  },
});

const Marks = mongoose.model("Marks", marksSchema);

module.exports = Marks;
