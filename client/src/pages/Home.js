import React from 'react';
import QuizList from '../components/QuizList';
import { QUERY_QUIZZES } from '../utils/queries';
import { useQuery } from '@apollo/client';


const Home = () => {
    const {data, loading} = useQuery(QUERY_QUIZZES);

    if (loading) {
        return <div>Loading...</div>
    }
    const quizzes = data?.quizzes || []
    return (
        <div>
            <QuizList quizzes={quizzes} profile={false}></QuizList>
        </div>
    );
}

export default Home;