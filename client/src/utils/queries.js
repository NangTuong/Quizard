import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
            quizzes {
                _id
                title
                questions {
                    question
                    choices
                    correct_answer
                }
                time_limit
            }
        }
    }
`;

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            friendCount
            friends {
                _id
                username
            }
            quizzes {
                _id
                title
                questions {
                    question
                    choices
                    correct_answer
                }
                time_limit
            }
        }
    }
`;

export const QUERY_QUIZZES = gql`
    query quizzes {
        quizzes {
            _id
            username
            user_id
            title
            questions {
                question
                choices
                correct_answer
            }
            time_limit
        }
    }
`

export const QUERY_QUIZ = gql`
    query quiz ($quizId: ID!) {
        quiz (_id: $quizId) {
            _id
            username
            user_id
            title
            questions {
                question
                choices
                correct_answer
            }
            time_limit
        }
    }

`