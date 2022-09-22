const { AuthenticationError } = require('apollo-server-express');
const { User, Quiz } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                    .populate('quizzes')
                    .populate('friends')
                console.log(userData)
                return userData
            }

            throw new AuthenticationError('Not logged in')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
              .select('-__v -password')
              .populate('quizzes')
              .populate('friends')
        },
        quizzes: async (parent, args) => {
            return Quiz.find().select('-__v');
        },
        quiz: async (parent, { _id }) => {
            return Quiz.findOne({ _id });
          }

    },

    Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);

          return { token, user };
        },
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
        addQuiz: async (parent, args, context) => {
          if (context.user) {
            const quiz = await Quiz.create({ ...args.quiz, username: context.user.username, user_id: context.user._id });
            const user = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { quizzes: quiz._id } },
              { new: true }
            )
            return quiz;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
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
        addRating: async (parent, args, context) => {
          if (context.user) {
            const updatedQuiz = await Quiz.findOneAndUpdate(
              { _id: args.quizId },
              { $push: { ratings: {...args, username: context.user.username } } },
              { new: true, runValidators: true }
            );
            return updatedQuiz;
            }
          throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
          if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { friends: friendId } },
              { new: true }
            ).populate('friends');
            return updatedUser;
          }
          throw new AuthenticationError('You need to be logged in!');
        }
      }
}

module.exports = resolvers