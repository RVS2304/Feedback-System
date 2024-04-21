import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menubar from "./Menubar";
import "./StudentDashboard.css";
import FeedbackForm from "./FeedbackForm";
import sha256 from "crypto-js/sha256";
import axios from 'axios';



const truncateHash = (hash, length) => {
  return hash.toString().substring(0, length);
};

const StudentDashboard = () => {

  const { rollNumber } = useParams();
  const [menuOptionsVisible, setMenuOptionsVisible] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [labs, setLabs] = useState([]);
  const [questions, setQuestions] = useState([]);

  console.log("courses");
  console.log(courses.join(','));

  console.log("Labs");
  console.log(labs);

  console.log("Faculty");
  console.log(faculty);
  
  const hashedRollNumber = sha256(rollNumber).toString();
  const truncatedHash = truncateHash(hashedRollNumber, 10);


  const toggleMenuOptions = () => {
    setMenuOptionsVisible(!menuOptionsVisible);
    console.log("Menubar Clicked");
  };  

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  useEffect(() => {
    // Fetch questions from the backend when the component mounts
    const fetchQuestions = async () => {
       try {
          const response = await axios.get('http://localhost:5000/feedback/fetchQuestions');
          setQuestions(response.data);
       } catch (error) {
          console.error('Error fetching questions:', error);
       }
    };

    fetchQuestions();
 }, []);


  // Fetch courses based on semester and department
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch student details to get semester and department
        const studentResponse = await axios.get(`http://localhost:5000/student/${rollNumber}`);
        console.log(studentResponse.data);
        const { semester, department } = studentResponse.data;

        // Fetch courses based on semester and department
        const coursesResponse = await axios.get(`http://localhost:5000/course/${semester}/${department}/courses`);
        console.log(coursesResponse.data);
        const tempCourses = coursesResponse.data;
        setCourses(coursesResponse.data);

        // Fetch labs based on semester and department
        const labsResponse = await axios.get(`http://localhost:5000/course/${semester}/${department}/labs`);
        console.log(labsResponse.data);
        setLabs(labsResponse.data);

        const facultyResponse = await axios.get(`http://localhost:5000/faculty/${department}/${tempCourses.join(',')}`);
        console.log(facultyResponse.data);
        const tempFaculty = facultyResponse.data.map(faculty => ({
          name: faculty.name,
          coursesAssigned: faculty.coursesAssigned
        }));
        setFaculty(tempFaculty);

        

      } catch (error) {
        console.error('Error fetching courses:', error);
      }
      
    };

    fetchCourses();
  }, [rollNumber]);


  return (
    <div className="student-dashboard">
      <header className={`student-navbar-parent ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <div className="student-dashboard-text">Student ID: <span>{truncatedHash}</span></div>
      </header>
      <Menubar toggleMenuOptions={toggleMenuOptions} toggleSidebar={toggleSidebar} />
      <div className="feedback-form-overlay">
      <FeedbackForm courses={courses} labs={labs} faculties={faculty} questions={questions} studentID={truncatedHash}  />
      </div>
    </div>
  );
};

export default StudentDashboard;