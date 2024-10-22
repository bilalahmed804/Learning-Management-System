import "./Home.css"
function TeacherList() {
  return (
    <div className="home-container">
    <h1>Teacher List</h1>
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
       
      </tbody>
    </table>
    <button className="register-button">Register New Student</button>
  </div>
  )
}

export default TeacherList
