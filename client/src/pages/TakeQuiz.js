import React, {useState, useEffect, useRef} from 'react';
import { QUERY_QUIZ } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';


const TakeQuiz = (props) => {
    const {id: quizId} = useParams();
    const {loading, data} = useQuery(QUERY_QUIZ, {
        variables: {
            quizId: quizId
        }
    });
    const timeRef = useRef(0);

    const [timerState, setTimerState] = useState({hours: '00',  minutes: '00', seconds: '00'})
    const [quizDone, setQuizDone] = useState(false)

    const [answersState, setAnswersState] = useState({questions: [], score: '0/10'})
    if (data) {
        if (!answersState.questions.length) {
            for (let question of data.quiz.questions) {
                answersState.questions.push({
                    ...question,
                    correct: false,
                    answer: -1
                })
            }
            answersState.score = `0/${answersState.questions.length.toString()}`
            setAnswersState(answersState)
        }
    }
    useEffect(() => {
        const setTimer = () => {
            let temp_time = timeRef.current;
            timerState.hours = parseInt(temp_time / 3600).toString().padStart(2, '0');
            temp_time %= 3600;
            timerState.minutes = parseInt(temp_time / 60).toString().padStart(2, '0');
            temp_time %= 60;
            timerState.seconds = temp_time.toString().padStart(2, '0');
            setTimerState({...timerState});
        };

        if (data) {
            timeRef.current = data.quiz.time_limit * 60;
        }

        var interval = setInterval(() => {
            setTimer();
            timeRef.current -= 1;
            if (timeRef.current <= 0) {
                clearInterval(interval);
                finishQuiz();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);

    const updateAnswers = (event) => {
        if (event.target.checked) {
            const question = parseInt(event.target.value.split('_')[0])
            const choice = parseInt(event.target.value.split('_')[1])

            answersState.questions[question].answer = choice;

            if (choice === data.quiz.questions[question].correct_answer) {
                answersState.questions[question].correct = true;
            }
            else {
                answersState.questions[question].correct = false;
            }
            const total_correct = answersState.questions.filter((question) => {
                return question.correct;
            })
            answersState.score = `${total_correct.length.toString()}/${answersState.questions.length}`;
            setAnswersState(answersState)
        }
    }

    const finishQuiz = () => {
        setQuizDone(true);
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    if (!quizDone) {
        return (
                <div className='form-cont'>
                    <div className=''>
                        <p><strong>Timer:</strong></p>
                        <p className='timer-box'>
                            <span className='timer-item'>{timerState.hours}</span>
                            <span className='timer-item'>{timerState.minutes}</span>
                            <span className='timer-item'>{timerState.seconds}</span>
                        </p>
                    </div>
                    <div className='quiz'>
                        <ol>
                            {data.quiz && data.quiz.questions.map((question, q_index) => (
                                <li  key={q_index}>
                                    <p>{question.question}</p>
                                    <div>
                                        {question.choices.map((choice, c_index) => (
                                            <div key={c_index} className='m-10'>
                                                <label>
                                                    <input onChange={updateAnswers} value={`${q_index}_${c_index}`} type='radio' name={`question_${q_index}_choice`}></input>
                                                    <span>{choice}</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                    <button className='btn' onClick={finishQuiz}>Finish</button>
                </div>
        )
    }
    else {
        return (
            <div className='question-card'>
                <h3 className='center'>Your Score: {answersState.score}</h3>
                <div>
              
                        {answersState.questions.map((question, index) => (
                            <div className='question-list-item'>
                                <p>Question {index + 1}: {question.question}</p>
                                <p>Result: <span>{question.correct ? 'CORRECT!' : 'INCORRECT'}</span></p>
                                {!question.correct && (
                                    <p style={{marginLeft: '12px'}}><strong>Correct Answer:</strong> {question.choices[question.correct_answer]}</p>
                                )}
                                <p style={{marginLeft: '12px'}}><strong>Your Answer:</strong> {question.choices[question.answer]}</p>
                            </div>
                        ))}
                  
                </div>
            </div>
        )
    }

}

export default TakeQuiz;