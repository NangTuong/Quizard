import React from 'react';

const QuizList = ({quizzes}) => {
    return (
        <div>
            {quizzes.map(quiz => (
                <div>{quiz.title}</div>
            ))}
        </div>
    )
}


export default QuizList;