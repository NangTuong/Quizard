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
            user_id
            title
            time_limit
            questions {
                question
                choices
            }
        }
    }
`

