const { Schema, model } = require('mongoose');
const questionSchema = new Schema(
    {
        question_text: {
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

const ratingSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        message: {
            type: String,
        },
        rating: {
            type: Number,
            required: true
        }
    }
)

const quizSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    time_limit: {
        type: Number,
        required: true,
    },
    ratings: [ratingSchema],
    questions: [questionSchema],
    scores: [Number],
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

quizSchema.methods.averageScore = () => {
  let total = 0;
  this.scores.forEach(score => total += score)
  return total / this.scores.length
};

quizSchema.methods.averageRating = () => {
    let total = 0;
    this.ratings.forEach(rating => total += rating.rating)
    return total / this.ratings.length
}

quizSchema.virtual('timesTaken').get(function() {
  return this.scores.length;
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
