import {addDoc, collection , getDocs} from "firebase/firestore";

import { useEffect, useState } from "react";
import { app,analytics,db} from '../utils/firebase.jsx';


import "./StudentRegister.css";

function StudentRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [students, setStudents] = useState([]); // To store list of students
  const [loading, setLoading] = useState(true)

  const getStudentData = async ()=>{
    setLoading(true)
    const querySnapshot = await getDocs(collection(db, "user"));
   const studentList = querySnapshot.docs.map(doc => ({
      id: doc.id, // Include the document ID
      ...doc.data()
    }));
    setStudents(studentList)
    setLoading(false)
  }
  useEffect(()=>{
    getStudentData()
  },[])
  
  const handleSubmit =async (e) => {

   

    setLoading(true)
    e.preventDefault(); // Prevent page refresh
    try{
    const docRef = await addDoc(collection(db, "user"), {
      firstName:firstName,
      lastName:lastName,
      email:email,
      gender:gender,
    });
    console.log("Document written with ID: ", docRef.id);
    const newStudent = { firstName, lastName, email, gender };
    // Add the new student to the students array
    setStudents([...students, newStudent]);
    
    // Clear the input fields after submission
    setFirstName('');
    setLastName('');
    setEmail('');
    setGender('');
  }
    catch (error) {
      console.error("Error adding student: ", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  return (
    <div className="home-container">
      <h1>Register New Student</h1>
      
      <form onSubmit={handleSubmit} className="student-register-form">
        
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <button
          type="submit"
          className="register-button"
          disabled={loading}  // Disable the button while loading
        >
          {loading ? "Loading..." : "Add New Student"}</button>
      </form>
  
    </div>
  );
}

export default StudentRegister;
