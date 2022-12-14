import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUIZ } from '../../utils/mutations';

const QuizForm = () => {
    const [formState, setFormState] = useState({ title: '', questions: [], time_limit: ''});
    const [addQuiz] = useMutation(ADD_QUIZ);
    const [errorState, setErrorState] = useState('');

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

        // Remove question from general form state
        formState.questions.splice(parseInt(event.target.value), 1);
        setFormState({...formState})
    }
    const handleAddQuestion = event => {
        event.preventDefault();
        // Retrieve data from form state
        const data = {...questionFormState}



        // Re-format question object
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

        // Set general form state
        setFormState({...formState})

        // Clear question form state
        setQuestionFormState({question: '',choice_1: '', choice_2: '', choice_3: '', choice_4: '', correct_answer: ''})
    }


    const handleFormSubmit = async event => {
        event.preventDefault();
        if (!formState.questions.length) {
            setErrorState("Please add questions before submitting!");
            setFormState({...formState})
            setTimeout(() => {
                formState.error = '';
                setErrorState('')
            }, 2000);
        }
        else {
            formState.time_limit = parseInt(formState.time_limit)
            try {
                await addQuiz({
                    variables: {
                        quiz: {...formState}
                    }
                })
                setFormState({ title: '', questions: [], time_limit: ''});
                setErrorState("Quiz successfully saved!");
                setTimeout(() => {
                    formState.error = '';
                    setErrorState('')
                }, 2000);
            }
            catch (error) {
                console.log(error)
                console.log(JSON.stringify(error, null, 2));
            }
        }
    }
    return (
        <div>
            <div className='form-cont'>
                <h2 className="quiz-title">
                Create a quiz!
                </h2>
                <div>
                    <div>
                        <form className='form' id='quiz-form' onSubmit={handleFormSubmit}>
                            <div>
                                <label className='label'>Quiz Title</label><br/>
                                <input className='input' name='title' placeholder='Quiz Title' onChange={handleChange} value={formState.title} required></input>
                            </div>
                            <div>
                                <label className='label'>Time Limit (minutes)</label><br/>
                                <input className='input' type='number' min='1' name='time_limit' placeholder='Time Limit' onChange={handleChange} value={formState.time_limit} required></input>
                            </div>
                        </form>
                    </div>
                    <div >
                        <div className='center'>
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
                                        <label className='label'>Correct Answer (1-4): </label>
                                        <input className='input' name='correct_answer' type='number' max='4' min='1' onChange={handleQuestionChange} value={questionFormState.correct_answer} required></input>
                                    </div>
                                </div>
                                <button className='btn m-10' type='submit'>Add To Quiz!</button>
                                <button className='btn m-10 btn-pulse' type='submit' form='quiz-form'>Done!</button>
                                <div>
                                    <p><strong>{errorState}</strong></p>
                                </div>
                            </form>
                        </div>
                    {formState.questions.length > 0 && (
                        <div>
                            <h3>{formState.title} Questions:</h3>
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
                                        <button className='btn shake' value={q_index} onClick={removeQuestion}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizForm;