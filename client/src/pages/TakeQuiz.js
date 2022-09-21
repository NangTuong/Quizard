import React from 'react';
import { QUERY_QUIZ } from '../../utils/queries';
import { useQuery } from '@apollo/client';



const TakeQuiz = ({quizId}) => {
    const {loading, data} = useQuery(QUERY_QUIZ);
}