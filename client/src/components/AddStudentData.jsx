import { useState } from 'react';
import axios from 'axios';

const AddStudentDataForm = () => {
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('department', department);
      formData.append('semester', semester);

      await axios.post('http://localhost:5000/api/add-student-data', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Student data uploaded successfully.');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload student data.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Select Department:</label>
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          <option value="civil">Civil</option>
          <option value="cse">CSE</option>
          <option value="ece">ECE</option>
          <option value="eee">EEE</option>
          <option value="mech">Mechanical</option>
        </select>
      </div>
      <div>
        <label>Select Semester:</label>
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      <div>
        <label>Upload Student Data File (xlsx):</label>
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddStudentDataForm;