import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { app,analytics} from '../../utils/firebase';
import { getAuth, onAuthStateChanged ,signInWithEmailAndPassword} from "firebase/auth";

import './Login.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // firebase section start
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid);
    navigate('/studentregister');
  } else {
   navigate("/create-account")
  }
  }); 

  const logIn = getAuth();
signInWithEmailAndPassword(logIn, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    
  });
    // firebase section end
  };

  return (
    <div className="login-container">
      <h2 className='tow'>Log In</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="login-btn">Login</button>
      </form>
      {/* Create Account Link */}
      <div className="create-account-link">
        <p>Don’t have an account? <NavLink to="/create-account">Create Account</NavLink></p>
      </div>
    </div>
  );
}
