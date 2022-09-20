import React from 'react';
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const MyQuiz = () => {
    const  {loading, data } = useQuery(QUERY_ME, {});

    if (loading) {
        return <div>Loading...</div>
    }
    console.log(data)


    return (
        <div>
        </div>
    )
}


export default MyQuiz;