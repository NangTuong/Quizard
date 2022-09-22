import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_QUIZ } from '../../utils/mutations';

const QuizList = ({quizzes, profile}) => {
    const [deleteQuizMutation] = useMutation(DELETE_QUIZ);
    const [quizzesState, setQuizzesState] = useState([...quizzes]);

    const deleteQuiz = async event => {
        const quizId = event.target.value;
        try {
            const {data} = await deleteQuizMutation({
                variables: {
                    quizId: quizId
                }
            })
            setQuizzesState([...data.deleteQuiz.quizzes])
        }
        catch(error) {
            console.log(JSON.stringify(error, null, 2));
        }
    }

    if (!quizzesState.length) {
        return <div>No Quizzes</div>
    }
    return (
        <div>
            {quizzesState.length > 0 && quizzesState.map(quiz => (

                <div key={quiz._id} className='quiz-list-item'>
                    <p className='quiz-title'>{quiz.title}</p>
                    {!profile &&(
                        <p>Creator: {quiz.username}</p>
                    )}
                    <div className='quiz-list-buttons'>
                        <Link to={`/take-quiz/${quiz._id}`} className='btn'>Take Quiz</Link>
                        {profile && (<button className='btn' onClick={deleteQuiz} value={quiz._id}>Delete</button>)}
                    </div>
                </div>
            ))}
        </div>
    )
}


export default QuizList;