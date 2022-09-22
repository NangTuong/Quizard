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
    title: String
    time_limit: Int
    timesTaken: Int
    ratings: [Rating]
    questions: [Question]
    scores: [Int]
  }

  input QuizInput {
    time_limit: Int
    title: String
    questions: [QuestionInput]
  }

  type Rating {
    _id: ID
    message: String
    rating: Int
  }

  type Question {
    _id: ID
    question: String
    choices: [String]
    correct_answer: Int
  }

  input QuestionInput {
    question: String
    choices: [String]
    correct_answer: Int
  }

  type Auth {
    token: ID!
    user: User
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
    addQuiz(quiz: QuizInput): Quiz
    addRating(quizId: ID!, message: String, rating: Int!): Quiz
    addFriend(friendId: ID!): User
    deleteQuiz(quizId: ID!): User
  }
`;

module.exports = typeDefs;
