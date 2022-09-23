const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
      // Queries logged in user
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                    .populate('quizzes')
                return userData
            }

            throw new AuthenticationError('Not logged in')
        },
      // Queries a specific user
        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('quizzes')
              .populate('friends')
        },
      // Queries all quizzes
        quizzes: async (parent, args) => {
            return Quiz.find().select('-__v');
        },
      // Queries on quiz
        quiz: async (parent, { _id }) => {
            return Quiz.findOne({ _id });
          }

    },

    Mutation: {
      // Adds a new user
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);

          return { token, user };
        },
      // Logs in a user
        login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });

          if (!user) {
            throw new AuthenticationError('Incorrect credentials');
          }

          const correctPw = await user.isCorrectPassword(password);

          if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
          }

          const token = signToken(user);
          return { token, user };
        },
      // Adds a new quiz
        addQuiz: async (parent, args, context) => {
          if (context.user) {
            const quiz = await Quiz.create({ ...args.quiz, username: context.user.username, user_id: context.user._id });
            const user = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { quizzes: quiz._id } },
              { new: true }
            ).populate('quizzes')
            return user;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
      // Deletes a quiz
        deleteQuiz: async (parent, { quizId }, context) => {
          try {
            if (context.user) {
              await Quiz.findOneAndDelete({_id: quizId });
              const user = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $pull: { quizzes: quizId } },
              ).populate('quizzes');
              return user;
            }
            throw new AuthenticationError('You need to be logged in!');
          }
          catch(error) {
            console.log(error)
          }
          },
      }
}

module.exports = resolvers