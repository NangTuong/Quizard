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
        <div className="">
          <h2 className="center">
            Viewing {userParam ? `${userParam}'s`: 'your'} profile
          </h2>
        </div>
        {!userParam && (
          <div className='btn-cont'>
            <button className='btn m-10' value='my-quizzes' onClick={changeComponent}>My Quizzes</button>
            <button className='btn m-10' value='quiz-form' onClick={changeComponent}>Create Quiz</button>
          </div>
        )}
        <div className="">
          <div className="">
            {component === 'quiz-form' ? (
              <div>
                <QuizForm></QuizForm>
              </div>
            ):(
              <div>
                <h2 className="">
                {userParam ? `${userParam}'s`: 'Your'} quizzes
                </h2>
                <QuizList profile={userParam ? false : true} quizzes={user.quizzes}/>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;

