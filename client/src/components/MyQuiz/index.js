import React from 'react';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';


const MyQuiz = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
      variables: {username: userParam }
   });

   const user = data?.me || data?.user || {};
   if (user.username) {
     console.log(user);
    }

    return (
        
        <div>
            <h2>{userParam ? `${user.username}'s` : 'Your'} Quizzes</h2>
            {user.quizzes.map((quiz) => (
                <div key={quiz._id}>
                    <div>
                    
                    </div>
                </div>
            ))}
            
        </div>
    )
}


export default MyQuiz;