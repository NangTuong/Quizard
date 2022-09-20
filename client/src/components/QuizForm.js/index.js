import React, {useState} from 'react';
import { useMutation } from '@apollo/client';

const QuizForm = () => {
    const [formState, setFormState] = useState({ quiz_title: '', questions: []});


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
        question.correct_answer = data.correct_answer
        question.question = data.question
        formState.questions.push(question)
        setFormState({...formState})
    }


    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(formState)
    }
    return (
        <div>
            <form
            id='quiz-form'
            onSubmit={handleFormSubmit}>
                <input
                type='text'
                name='quiz_title'
                placeholder='Quiz Title'
                onChange={handleChange}
                value={formState.quiz_title}
                >
                </input>
                {formState.questions.map((question, index) => (
                    <button value={index}>{question.question}</button>
                ))}
                <button
                type='submit'
                >Submit
                </button>
            </form>
            <form
            id='add-question-form'
            onSubmit={handleAddQuestion}>
                <div
                style={
                    {
                        display: 'flex',
                        flexDirection: 'column'
                    }
                }
                >
                    <input
                name='question'
                onChange={handleQuestionChange}
                value={questionFormState.question}
                placeholder='Question'
                ></input>
                <input
                name='choice_1'
                onChange={handleQuestionChange}
                value={questionFormState.choice_1}
                placeholder='Choice 1'
                ></input>
                <input
                name='choice_2'
                onChange={handleQuestionChange}
                value={questionFormState.choice_2}
                placeholder='Choice 2'
                ></input>
                <input
                name='choice_3'
                onChange={handleQuestionChange}
                value={questionFormState.choice_3}
                placeholder='Choice 3'
                ></input>
                <input
                name='choice_4'
                onChange={handleQuestionChange}
                value={questionFormState.choice_4}
                placeholder='Choice 4'
                ></input>
                <input
                name='correct_answer'
                placeholder='Correct Answer (1-4)'
                type='number'
                max='4'
                min='1'
                onChange={handleQuestionChange}
                value={questionFormState.correct_answer}
                ></input>
                </div>
                <button
                type='submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default QuizForm;