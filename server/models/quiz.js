var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var quiz = new Schema ({
  userId: { type: Schema.Types.ObjectId, required: true },
  setId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now },
  correct: Number,
  incorrect: Number,
  skipped: Number
});

var QuizSummary = mongoose.model("QuizSummary", quiz);

module.exports = QuizSummary;
