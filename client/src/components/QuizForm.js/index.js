import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUIZ } from '../../utils/mutations';

const QuizForm = () => {
    const [formState, setFormState] = useState({ title: '', questions: [], time_limit: ''});
    const [addQuiz] = useMutation(ADD_QUIZ);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    const [questionFormState ,setQuestionFormState] = useState({question: '',choice_1: '', choice_2: '', choice_3: '', choice_4: '', correct_answer: ''})

    const handleQuestionChange = event => {
        const {name, value} = event.target
        setQuestionFormState({
            ...questionFormState,
            [name]: value
        })
    }

    const removeQuestion = event => {
        event.preventDefault();
        event.stopPropagation();
        formState.questions.splice(parseInt(event.target.value), 1);
        console.log(formState)
        setFormState({...formState})
    }
    const handleAddQuestion = event => {
        event.preventDefault();
        const data = {...questionFormState}
        const question = {
            question: '',
            choices: [],
            correct_answer: ''
        }
        for (let i = 1; i <=4; i++) {
            question.choices.push(data[`choice_${i}`]);
        }
        // Convert to index
        question.correct_answer = (parseInt(data.correct_answer) - 1);
        question.question = data.question
        formState.questions.push(question)
        setFormState({...formState})
        setQuestionFormState({question: '',choice_1: '', choice_2: '', choice_3: '', choice_4: '', correct_answer: ''})
    }


    const handleFormSubmit = async event => {
        event.preventDefault();
        formState.time_limit = parseInt(formState.time_limit)
        console.log(formState)
        try {
            const { data } = await addQuiz({
                variables: {
                    quiz: {...formState}
                }
            })
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className='form-cont'>
                <div>
                    <div>
                        <form className='form' id='quiz-form' onSubmit={handleFormSubmit}>
                            <div>
                                <label className='label'>Quiz Title</label><br/>
                                <input className='input' name='title' placeholder='Quiz Title' onChange={handleChange} value={formState.quiz_title} required></input>
                            </div>
                            <div>
                                <label className='label'>Time Limit (minutes)</label><br/>
                                <input className='input' name='time_limit' placeholder='Time Limit' onChange={handleChange} value={formState.time_limit} required></input>
                            </div>
                        </form>
                    </div>
                    <div>
                        <h3>Add Questions!</h3>
                        <form id='add-question-form' onSubmit={handleAddQuestion}>
                            <div>
                                <label className='label'>Question: </label>
                                <input className='input' name='question'  onChange={handleQuestionChange}  value={questionFormState.question} placeholder='Question' required></input>
                                <div>
                                    <label className='label'>Choice 1: </label>
                                    <input className='input' name='choice_1' onChange={handleQuestionChange} value={questionFormState.choice_1} placeholder='Choice 1' required></input>
                                </div>
                                <div>
                                    <label className='label'>Choice 2: </label>
                                    <input className='input' name='choice_2' onChange={handleQuestionChange} value={questionFormState.choice_2} placeholder='Choice 2' required></input>
                                </div>
                                <div>
                                    <label className='label'>Choice 3: </label>
                                    <input className='input' name='choice_3' onChange={handleQuestionChange} value={questionFormState.choice_3} placeholder='Choice 3' required></input>
                                </div>
                                <div>
                                    <label className='label'>Choice 4: </label>
                                    <input className='input' name='choice_4' onChange={handleQuestionChange} value={questionFormState.choice_4} placeholder='Choice 4' required></input>
                                </div>
                                <div>
                                    <label className='label'>Correct Answer: </label>
                                    <input className='input' name='correct_answer' placeholder='(1-4)' type='number' max='4' min='1' onChange={handleQuestionChange} value={questionFormState.correct_answer} required></input>
                                </div>
                            </div>
                            <button className='btn quiz-btn' type='submit'>Add To Quiz!</button>
                            <button className='btn quiz-btn btn-pulse' type='submit' form='quiz-form'>Done!</button>
                        </form>
                    </div>
                </div>
                
                {formState.questions.length > 0 && 
                    <div>
                        <p>{formState.title} Questions:</p><br/>
                        <div className='quiz-questions'>    
                            {formState.questions.map((question, q_index) => (
                                <div key={q_index} className="question-card">
                                    <p className='label'>Question: {question.question}</p>
                                    <p style={{fontStyle: 'italic', fontWeight: 'bold'}}>Correct Answer:{question.correct_answer + 1}</p>
                                    <ol>
                                        {question.choices.map((choice, c_index) => (
                                            <li key={c_index} className="label"><p>{choice}</p></li>
                                        ))}
                                    </ol>
                                    <button className='btn' value={q_index} onClick={removeQuestion}>Remove</button>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default QuizForm;