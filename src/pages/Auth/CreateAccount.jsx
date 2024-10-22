// CreateAccount.js
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app,analytics} from '../../utils/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import './CreateAccount.css';



export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }
    // Firebase section start
    const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      
    });
   
    // Firebase section end
    // Handle account creation logic here (e.g., validation)
    console.log('Creating account with:', username, email, password);

    // Call the createAccount function from context
    navigate('/home'); // Navigate to the dashboard after creating the account
  };

  return (
    <div className="create-account-container">
      <h2 className='tow'>Create Account</h2>
      <form className="create-account-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="create-account-btn">Create Account</button>
      </form>
    </div>
  );
}
