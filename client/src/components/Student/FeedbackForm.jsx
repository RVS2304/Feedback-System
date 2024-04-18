import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './FeedbackForm.css';

function FeedbackForm({ courses, labs, faculties, questions, studentID }) {
   // console.log(questions);
   const [feedback, setFeedback] = useState([]);
   const [labComments, setLabComments] = useState(Array(labs.length).fill(''));
   const [facultyComments, setFacultyComments] = useState(Array(faculties.length).fill(''));

   useEffect(() => {
      // Initialize the feedback state based on the number of questions
      setFeedback(Array(questions.length).fill('').map(() => Array(courses.length).fill('')));
   }, [questions, courses]);


   const handleSubmit = async (e) => {
      e.preventDefault();

      const isConfirmed = window.confirm("Are you sure you want to submit the form?");
      if (!isConfirmed) {
         return;
      }

      try {
         // Prepare feedback data
         const feedbackData = faculties.flatMap((faculty, facultyIndex) => {
            // Get the courses associated with the current faculty
            const facultyCourses = faculty.coursesAssigned;
            return facultyCourses.map(course => {
               const facultyFeedback = {
                  StudentID: studentID,
                  FacultyName: faculty.name,
                  Feedback: [{
                     courseName: course,
                     ratings: questions.map((_, questionIndex) => ({
                        QNO: questionIndex + 1,
                        Rating: parseInt(feedback[questionIndex][courses.indexOf(course)])
                     })),
                     labComment: labComments[courses.indexOf(course)] || '',
                     facultyComment: facultyComments[facultyIndex] || ''
                  }]
               };
               return facultyFeedback;
            });
         });
   
         console.log(feedbackData);
         // Send data to backend
         const response = await axios.post('http://localhost:5000/feedback/submitFeedback', feedbackData);
   
         // Handle success response
         console.log('Feedback submitted successfully:', response.data);
   
         // Clear form inputs
         // setFeedback(Array(10).fill('').map(() => Array(courses.length).fill('')));
         // setLabComments(Array(labs.length).fill(''));
         // setFacultyComments(Array(faculties.length).fill(''));
   
         alert("Feedback submitted successfully!");
   
      } catch (error) {
         // Handle error
         console.error('Error submitting feedback:', error);
      }
     
   };

   return (
      <div className="feedback-form">
         <form onSubmit={handleSubmit}>
            <div>
               <center><h1>Feedback Form</h1></center>
               <table>
                  <thead>
                     <tr >
                        <label style={{float:'right'}}><th></th>
                        {courses.map((course, index) => (
                           <th key={index} className='subject-names'>{course}</th>
                        ))}</label>
                     </tr>
                  </thead>
                  <tbody>
                     {questions.map((question, questionIndex) => (
                        <tr key={questionIndex}>
                         <label className='table-row'>
                        <label className='questions'> <td><label className='rating-row'>{questionIndex + 1}. {question}</label></td></label>
                          <label className='dropdowns'> {courses.map((course, courseIndex) => (
                              <td key={courseIndex} >
                                 <Form.Control
                                    as="select"
                                    value={feedback[questionIndex][courseIndex]}
                                    className='rating'
                                    onChange={(e) => {
                                       const newFeedback = [...feedback];
                                       newFeedback[questionIndex][courseIndex] = e.target.value;
                                       setFeedback(newFeedback);
                                    }}
                                    required
                                 >
                                    <option value="">Rate</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                 </Form.Control>
                              </td>
                           ))}</label>
                         </label>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <br />
            <div>
               {labs.map((lab, labIndex) => (
                  <div key={labIndex}>
                     <label> Comment on {lab} Lab:</label>
                     <Form.Control
                        as="textarea"
                        type='text'
                        className='subject-textarea'
                        value={labComments[labIndex]}
                        onChange={(e) => {
                           const newComments = [...labComments];
                           newComments[labIndex] = e.target.value;
                           setLabComments(newComments);
                        }}
                        required
                     />
                  </div>
               ))}
            </div>
            <br />
            <div>
               {faculties.map((faculty, facultyIndex) => (
                  <div key={facultyIndex}>
                     <label> Comment on {faculty.name}:</label>
                     <Form.Control
                        as="textarea"
                        type='text'
                        className='subject-textarea'
                        value={facultyComments[facultyIndex]}
                        onChange={(e) => {
                           const newComments = [...facultyComments];
                           newComments[facultyIndex] = e.target.value;
                           setFacultyComments(newComments);
                        }}
                        required
                     />
                  </div>
               ))}
            </div>
            <br />
            <center><button type="submit" className='btn btn-primary'>Submit</button></center>
         </form>
      </div>
   );
}

export default FeedbackForm;
