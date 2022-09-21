import React from 'react';
import { QUERY_QUIZZES } from '../../utils/queries';
import { useQuery } from '@apollo/client';


const Quizzes = () => {
    const  {loading, data } = useQuery(QUERY_QUIZZES);

    if (loading) {
        return <div>Loading...</div>
    }
    console.log(data)


    return (
        <div>
        </div>
    )
}

export default Quizzes;
