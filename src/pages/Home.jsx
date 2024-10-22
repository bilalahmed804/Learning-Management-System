import { collection , getDocs ,doc, deleteDoc} from "firebase/firestore";
import { app,analytics,db} from '../utils/firebase.jsx';

import './Home.css';
import { useState,useEffect } from 'react';
import { NavLink } from "react-router-dom";


const Home = () => {

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

  return (
    <div className="home-container">
      <h1>Student List</h1>
      {loading ? (
        <div className="flex items-center justify-center h-screen -mt-60">
        <div className="spinner w-16 h-16 border-4 border-blue-500 border-solid 
        border-t-transparent rounded-full animate-spin"></div>
      </div>
      ) : (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.gender}</td>
              <td><button >Edit</button></td>
              <td><button onClick={async () => {
                setLoading(true)
            try {
              // Delete the document using the student's id
              await deleteDoc(doc(db, "user", student.id));
              console.log("Document deleted successfully");

              // Update the UI after deletion
              setStudents(students.filter(item => item.id !== student.id));
            } catch (error) {
              console.error("Error deleting document: ", error);
            }
            setLoading(false)
          }}
        >Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      <NavLink to={"/studentregister"} className="text-white bg-blue-600 p-3 rounded-md">Register New Student</NavLink>
    </div>
  );
};

export default Home;
