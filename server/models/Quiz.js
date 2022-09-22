const { Schema, model } = require('mongoose');
const questionSchema = new Schema(
    {
        question: {
            type: String,
            required: true
        },
        choices: [
            {
                type: String
            }
        ],
        correct_answer: {
            type: Number,
        }
    }
)
const quizSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    title: {
      type: String,
      required: true
    },
    time_limit: {
        type: Number,
        required: true,
    },
    questions: [questionSchema],
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);


const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
