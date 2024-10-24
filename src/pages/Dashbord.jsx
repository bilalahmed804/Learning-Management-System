import { NavLink } from "react-router-dom";
import { collection , getDocs} from "firebase/firestore";
import { db } from '../utils/firebase';
import { useState, useEffect } from "react";
import "./Dashbord.css";
export default function Dashbord() {

  const [students, setStudents] = useState([]); 


  const getStudentData = async ()=>{
    const querySnapshot = await getDocs(collection(db, "users"));
   const studentList = querySnapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
    setStudents(studentList)
    console.log(studentList[0].userImage);
    
  }
  useEffect(()=>{
    getStudentData()
  },[])

  return (
    <div className="main-content">
      {/* Header */}
      <header className="header">
        <div className="user-info">
        {students.map((student,index)=>(
          <span  key={index}>
          <img
          width={100}
          height={100}
          src={student.userImage}
          alt="User Avatar"
          className="avatar"
          />

          <h3>Welcome, {student.username}</h3>
          </span>
        ))}
      
     
        </div>

        {/* Login Button */}
        <div className="login-btn-container">
          <NavLink to={"/login"} className={"login-btn"}>Log In</NavLink>
        </div>
      </header>

      {/* Dashboard Sections */}
      <section className="dashboard">
        <div className="dashboard-card">
          <h3>My Courses</h3>
          <p>View all enrolled courses</p>
        </div>
        <div className="dashboard-card">
          <h3>Assignments</h3>
          <p>Check upcoming assignments</p>
        </div>
        <div className="dashboard-card">
          <h3>Quizzes</h3>
          <p>Attempt ongoing quizzes</p>
        </div>
        <div className="dashboard-card">
          <h3>Notifications</h3>
          <p>See recent updates</p>
        </div>
      </section>
    </div>
  );
}
