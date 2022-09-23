import React from 'react';
import {Link} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_QUIZ } from '../../utils/mutations';

const QuizList = ({quizzes, profile}) => {
    const [deleteQuizMutation] = useMutation(DELETE_QUIZ);

    // Handles deletion of quiz
    const deleteQuiz = async event => {
        const quizId = event.target.value;
        try {
            await deleteQuizMutation({
                variables: {
                    quizId: quizId
                }
            })
        }
        catch(error) {
            console.log(JSON.stringify(error, null, 2));
        }
    }

    if (!quizzes.length) {
        return <div>No Quizzes</div>
    }
    return (
        <div className=''>
            {quizzes.length > 0 && quizzes.map(quiz => (

                <div key={quiz._id} className='quiz-list-item'>
                    <p className='quiz-title'>{quiz.title}</p>
                    {!profile &&(
                            <p className='center'>Creator: <Link to={`/profile/${quiz.username}`}>{quiz.username}</Link></p>
                        )}
                    <div className='btn-cont'> 
                        <Link to={`/take-quiz/${quiz._id}`} className='btn m-10 pulse'>Take Quiz</Link>
                        {profile && (<button className='btn m-10 shake' onClick={deleteQuiz} value={quiz._id}>Delete</button>)}
                    </div>
                    
                </div>
            ))}
        </div>
    )
}


export default QuizList;