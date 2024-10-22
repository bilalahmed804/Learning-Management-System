import "./AddSyllabus.css"
function AddSyllabus() {
  return (
    <div className="add-syllabus-container">
    <h2>Add New Syllabus</h2>
    <form  className="add-syllabus-form">
      <label>
        Subject Name:
        <input
          type="text"
          // value={subjectName}
          // onChange={(e) => setSubjectName(e.target.value)}
          required
        />
      </label>
      <label>
        Class:
        <input
          type="text"
          // value={className}
          // onChange={(e) => setClassName(e.target.value)}
          required
        />
      </label>
      <label>
        Course:
        <select
          // value={course}
          // onChange={(e) => setCourse(e.target.value)}
          required
        >
          <option value="">Select a course</option>
          <option value="Accounting">Accounting</option>
          <option value="General Science">General Science</option>
          <option value="Pre-Engineering">Pre-Engineering</option>
        </select>
      </label>
      <label>
        Upload PDF:
        <input
          type="file"
          accept=".pdf"
          // onChange={handleFileChange}
          required
        />
      </label>
      <button type="submit">Add Syllabus</button>
    </form>
  </div>
  )
}

export default AddSyllabus
