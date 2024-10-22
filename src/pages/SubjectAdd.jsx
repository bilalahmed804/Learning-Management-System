import "./SubjectAdd.css"
function SubjectAdd() {
  return (
    <div className="subject-add-container">
    <h1>Add New Subject</h1>
    <form >
      <input
        type="text"
        placeholder="Enter Your Subject Name"
        // value={subjectName}
        // onChange={(e) => setSubjectName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Enter Your Class"
        // value={classNumber}
        // onChange={(e) => setClassNumber(e.target.value)}
        min="1"
        required
      />
      <div className="radio-group">
        <h3>Course Select:</h3>
        <label>
          <input
            type="radio"
            name="course"
            value="Accounting"
            // onChange={(e) => setCourse(e.target.value)}
            required
          />
          Accounting
        </label>
        <label>
          <input
            type="radio"
            name="course"
            value="General Science"
            // onChange={(e) => setCourse(e.target.value)}
          />
          General Science
        </label>
        <label>
          <input
            type="radio"
            name="course"
            value="Pre-Engineering"
            // onChange={(e) => setCourse(e.target.value)}
          />
          Pre-Engineering
        </label>
      </div>
      <button type="submit">Add Subject</button>
    </form>
  </div>
  )
}

export default SubjectAdd
