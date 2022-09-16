const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    quizzes: [Quiz]
    friends: [User]
  }

  type Quiz {
    _id: ID
    username: String
    user_id: ID
    time_limit: Int
    timesTaken: Int
    ratings: [Rating]
    questions: [Question]
    scores: [Int]
  }

  type Rating {
    _id: ID
    message: String
    rating: Int
  }

  type Question {
    _id: ID
    question_text: String
    choices: [String]
    correct_answer: Int
  }

  type Query {
    me: User
    user(username: String!): User
    quizzes: [Quiz]
    quiz(_id: ID!): Quiz
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addQuiz(time_limit: Int!, questions: [Question]!): Quiz
    addReaction(quizId: ID!, message: String, rating: Int!): Quiz
    addFriend(friendId: ID!): User
    deleteQuiz(quizId: String!): Quiz
  }
`;

module.exports = typeDefs;
