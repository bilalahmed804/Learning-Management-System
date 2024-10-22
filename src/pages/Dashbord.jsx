import { NavLink } from "react-router-dom";
import "./Dashbord.css";
export default function Dashbord() {
  return (
    <div className="main-content">
      {/* Header */}
      <header className="header">
        <div className="user-info">
          <img
            width={100}
            height={100}
            src="public/avatar.jpg"
            alt="User Avatar"
            className="avatar"
          />
          <h3>Welcome, User</h3>
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
