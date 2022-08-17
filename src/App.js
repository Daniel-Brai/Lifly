import { useState } from 'react';
import './App.css';
import AuthForm from './pages/Auth/AuthForm';
import Home from './pages/Chat/Home';

function App() {
  let token = localStorage.getItem('token') ? true : false;
  const [loggedIn, setLoggedIn] = useState(token)
  return (
   <>
    {
      loggedIn? <Home setLoggedIn={setLoggedIn} /> :  <AuthForm setLoggedIn={setLoggedIn} />
    }
   </>
  );
}

export default App;
