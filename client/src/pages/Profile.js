import React, {useState} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import QuizForm from '../components/QuizForm.js';
import QuizList from '../components/QuizList';


const Profile = (props) => {
    const { username: userParam } = useParams();
    const [component, setComponent] = useState('my-quizzes');
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
      variables: {username: userParam }
   });

   const user = data?.me || data?.user || {};

   const changeComponent = event => {
     const newComponent = event.target.value;
     setComponent(newComponent);
   }

   // navigate to personal profile page if username is the logged-in user's
   if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
   }
  
   if (loading) {
    return <div>Loading...</div>
   }
  
   if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
   }
    return (
      <div>
        <div className="flex-row mb-3">
          <h2 className="bg-dark text-secondary p-3 display-inline-block">
            Viewing {userParam ? `${userParam}'s`: 'your'} profile.
          </h2>
        </div>
        <button className='btn' value='my-quizzes' onClick={changeComponent}>My Quizzes</button>
        <button className='btn' value='quiz-form' onClick={changeComponent}>Create Quiz</button>
  
        <div className="flex-row justify-space-between mb-3">
          <div className="col-12 col-lg-3 mb-3">
            {component === 'quiz-form' ? (
              <div>
                <QuizForm></QuizForm>
              </div>
            ):(
              <div>
                <h2 className="bg-dark text-secondary p-3 display-inline-block">
                Your Quizzes
                </h2>
                <QuizList profile={userParam ? false : true} quizzes={user.quizzes}/>
              </div>
            )}
          </div>
          <div className="col-12 col-lg-3 mb-3">
          </div>
        </div>
        
      </div>
    );
  };
  
  export default Profile;

