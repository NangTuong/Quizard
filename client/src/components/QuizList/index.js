import React from 'react';

const QuizList = ({quizzes}) => {
    return (
        <div>
            {quizzes.map(quiz => (
                <div className="question-card">
                    <div>
                    {quiz.title}
                    </div>
                    <div>
                    {quiz.time_limit} Minutes
                    </div>
                </div>
            
                 ))}
        </div>
    )
}


export default QuizList;