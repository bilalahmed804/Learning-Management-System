import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";


import "./SideOption.css"
import { useEffect, useState } from 'react';
function SideOption() {

    const [islogIn ,setLogIn] = useState(false)
    const navigate = useNavigate()
 useEffect(()=>{
   const auth = getAuth();
   onAuthStateChanged(auth, (user) => {
     if (user) {
      
       setLogIn(true)
      } else {
     setLogIn(false)
      }
    });
    },[])
  

  const hendleLogout = ()=>{
    const auth = getAuth();
  signOut(auth).then(() => {
    console.log("user signOut");
    islogIn(false)
  }).catch((error) => {
    console.log(error);
    
  });

  }
  const handleLogin = () => {
    navigate('/login'); 
  };
  const handleNavClick = (e) => {
    if (!islogIn) {
        e.preventDefault();
        alert("You must be logged in to access this page.");
    }
};

  return (
    <div className="sidebar">
      <h2>LMS System (Learning Management System)</h2>
      <NavLink to="/studentregister" onClick={handleNavClick}>Register Student</NavLink>
      <NavLink to="/home">Student List</NavLink>
      <NavLink to="/teacher-register"onClick={handleNavClick}>Register Teacher</NavLink>
      <NavLink to="/teacherlist">Teacher List</NavLink>
      <NavLink to="/subject-add" onClick={handleNavClick}>Add Subject</NavLink>
      <NavLink to="/subjectlist">Subject List</NavLink>
      <NavLink to="/addsyllabus"onClick={handleNavClick}>Add Syllabus</NavLink>
      <NavLink to="/syllabuslist">Syllabus List</NavLink>
      {islogIn ? (
        <button className="login-button" onClick={hendleLogout}>Log Out</button>
      ) : (
        <button className="login-button" onClick={handleLogin}>Log In</button>
      )}</div>
  )
}

export default SideOption
