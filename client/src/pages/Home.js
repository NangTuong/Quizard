import React from 'react';
import { QUERY_QUIZZES } from '../utils/queries';
import { useQuery } from '@apollo/client';
import QuizList from '../components/QuizList';


const Home = () => {
    const  {loading, data } = useQuery(QUERY_QUIZZES);
    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            <QuizList quizzes={data.quizzes}></QuizList>
        </div>
    );
}

export default Home;