import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
              <div>
                <Header></Header>
                  <Routes>
                    <Route
                      path='/'
                      element={<Home />}
                    />
                    <Route 
                      path ='/login'
                      element={<Login />}
                    />
                    <Route
                      path ='/signup'
                      element={<Signup/>}
                    />
                    <Route path ='/profile'>
                      <Route path =":username" element={<Profile/>} />
                      <Route path ="" element={<Profile/>} />
                    </Route>
                  </Routes>
                  <Footer />
              </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;