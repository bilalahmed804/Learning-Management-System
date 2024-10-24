import { useState } from "react"
import { db } from "../utils/firebase"
import { addDoc,collection } from "firebase/firestore"
import "./SubjectAdd.css"


function SubjectAdd() {
  const [subjectName, setSubjectName] = useState("");
  const [classNumber, setClassNumber] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault(); 
    try {
      await addDoc(collection(db, "subjects"), {
        subjectName: subjectName,
        moduleNumber: classNumber,
        course: course,
      });

      console.log("Subject added successfully!");
      setSubjectName("");
      setClassNumber("");
      setCourse("");
     } catch (error) {
        console.error("Error adding student: ", error);
      } finally {
        setLoading(false);
      }
  
  };
  return (
    <div className="subject-add-container">
    <h1>Add New Subject</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Your Subject Name"
        value={subjectName}
        onChange={(e) => setSubjectName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Enter Your Module"
        value={classNumber}
        onChange={(e) => setClassNumber(e.target.value)}
        min="1"
        required
      />
      <div className="radio-group">
        <h3>Course Select:</h3>
        <label>
          <input
            type="radio"
            name="course"
            value="Web Development"
            onChange={(e) => setCourse(e.target.value)}
            required
          />
          &nbsp; Web Development
        </label>
        <label>
          <input
            type="radio"
            name="course"
            value="App Development"
            onChange={(e) => setCourse(e.target.value)}
          />
         &nbsp; App Development
        </label>
        <label>
          <input
            type="radio"
            name="course"
            value="Graphic Designing"
            onChange={(e) => setCourse(e.target.value)}
          />
         &nbsp; Graphic Designing
        </label>
      </div>
      <button type="submit" 
      disabled={loading} 
        >
          {loading ? "Loading..." : "Add New Subject"}</button>
    </form>
  </div>
  )
}

export default SubjectAdd
