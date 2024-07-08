import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showLoginForm, setShowLoginForm] = useState(false);
  
 
  

  const handleSignUp = (newToken) => {
    setToken(newToken);
    setShowLoginForm(true);
  };

  const handleLogin = (newToken) => {
    setToken(newToken);
    setShowLoginForm(false); // Hide the login form after successful login
  };

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };


  
  
  return (
    <div className="App">
      {token ? (
        <div>
          <h2>Welcome User!</h2>
          
          <EmployeeList  />
        </div>
      ) : (
        showLoginForm ? (
          <LoginForm onLogin={handleLogin} toggleForm={toggleForm} />
        ) : (
          <SignUpForm onSignUp={handleSignUp} toggleForm={toggleForm} />
        )
      )}
    </div>
  );
}

export default App;
