import { collection , getDocs ,doc, deleteDoc} from "firebase/firestore";
import { db } from "../utils/firebase"

import { useState,useEffect } from "react";
import "./SubjectList.css"
function SubjectList() {
  const [students, setStudents] = useState([]); 
  const [loading, setLoading] = useState(true)


  const getStudentData = async ()=>{
    setLoading(true)
    const querySnapshot = await getDocs(collection(db, "subjects"));
   const studentList = querySnapshot.docs.map(doc => ({
      id: doc.id, 
      ...doc.data()
    }));
    setStudents(studentList)
    setLoading(false)
  }
  useEffect(()=>{
    getStudentData()
  },[])
  return (
    <div className="subject-list-container">
      <h1>Subject List</h1>
      {loading ? (
        <div className="flex items-center justify-center h-screen -mt-60">
        <div className="spinner w-16 h-16 border-4 border-blue-500 border-solid 
        border-t-transparent rounded-full animate-spin"></div>
      </div>
      ) : (
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Module</th>
            <th>Subject Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {students.map((student, index) => (
            <tr key={index}>
              <td>{student.course}</td>
              <td>{student.moduleNumber}</td>
              <td>{student.subjectName}</td>
              <td><button >Edit</button></td>
              <td><button onClick={async () => {
                setLoading(true)
            try {
              await deleteDoc(doc(db, "subjects", student.id));
              console.log("Document deleted successfully");

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
    </div>
  )

}

export default SubjectList
