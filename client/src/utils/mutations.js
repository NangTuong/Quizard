import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }

`;

export const ADD_QUIZ = gql`
    mutation addQuiz($quiz: QuizInput) {
        addQuiz(quiz: $quiz) {
            _id
            username
            quizzes {
                _id
                title
                questions {
                    choices
                    question
                }
                time_limit
            }
        }
    }
`

export const DELETE_QUIZ = gql`
    mutation deleteQuiz($quizId: ID!) {
        deleteQuiz(quizId: $quizId) {
            _id
            username
            quizzes {
                _id
                title
            }
        }
    }
`

