import React from 'react';
import {Link} from 'react-router-dom';

const QuizList = ({quizzes}) => {
    return (
        <div>
            {quizzes.map(quiz => (

                <div key={quiz._id}>
                    <p>{quiz.title}</p>
                    <Link to={`/take-quiz/${quiz._id}`} className='btn'>Take Quiz</Link>
                </div>
            ))}
        </div>
    )
}


export default QuizList;