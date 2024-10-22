import { useState } from 'react';
import './SyllabusList.css'; // Assuming you have a CSS file for styling

function SyllabusList() {
  const [subjectName, setSubjectName] = useState('');
  const [className, setClassName] = useState('');
  const [course, setCourse] = useState('');
  const [term, setTerm] = useState('');
  const [description, setDescription] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    const syllabusData = {
      subjectName,
      className,
      course,
      term,
      description,
      effectiveDate,
      teacherName,
      file,
    };
    console.log(syllabusData);
    // You can send the data to a backend or store it in state
  };

  return (
    <div className="add-syllabus-container">
      <h2>Add New Syllabus</h2>
      <form className="add-syllabus-form" onSubmit={handleSubmit}>
        {/* Subject Name */}
        <label>
          Subject Name:
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </label>

        {/* Class */}
        <label>
          Class:
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
        </label>

        {/* Course */}
        <label>
          Course:
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            <option value="Accounting">Accounting</option>
            <option value="General Science">General Science</option>
            <option value="Pre-Engineering">Pre-Engineering</option>
          </select>
        </label>

        {/* Semester/Term */}
        <label>
          Semester/Term:
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          >
            <option value="">Select a term</option>
            <option value="1st Term">1st Term</option>
            <option value="2nd Term">2nd Term</option>
            <option value="Final Term">Final Term</option>
          </select>
        </label>

        {/* Syllabus Description */}
        <label>
          Syllabus Description (Optional):
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide a brief description..."
          />
        </label>

        {/* Effective Date */}
        <label>
          Effective Date:
          <input
            type="date"
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            required
          />
        </label>

        {/* Teacher Name */}
        <label>
          Teacher Name (Optional):
          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Enter your name"
          />
        </label>

        {/* Upload PDF */}
        <label>
          Upload PDF:
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>

        {/* Submit Button */}
        <button type="submit">Add Syllabus</button>
      </form>
    </div>
  );
}

export default SyllabusList;
