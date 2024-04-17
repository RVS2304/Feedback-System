import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './FeedbackForm.css';

function New() {

    const courses = ["c1", "c2", "c3"];

    const [feedback, setFeedback] = useState(Array(10).fill('').map(() => Array(courses.length).fill('')));

    const handleFeedbackChange = (questionIndex, courseIndex, e) => {
        const newFeedback = [...feedback];
        newFeedback[questionIndex][courseIndex] = e.target.value;
        setFeedback(newFeedback);
    };





    return (
        <div className="feedback-form">
            <form className="student-feedback-form">
                <table className='feedback'>
                    <thead className='table-header'>
                        <tr>
                            <th className='heading'>A. COURSE CONTENT</th>
                            <div className='subjects'>
                                {courses.map((course, index) => (
                                    <label key={index}>{course}</label>
                                ))}
                            </div>
                        </tr>
                    </thead>
                    
                    <tbody className='feedback-body'>
                        <div className='questions'>
                            <div className='question-1'>
                                <span className='serial-no'>1.</span>
                                <label>The teacher covers the entire syllabus</label>
                            </div>
                            <div className='question-2'>
                                <span className='serial-no'>2.</span>
                                <label>The teacher discusses topics in detail</label>
                            </div>
                            <div className='question-3'>
                                <span className='serial-no'>3.</span>
                                <label>The teacher possesses deep knowledge of the  subject taught</label>
                            </div>
                            <div className='question-4'>
                                <span className='serial-no'>4.</span>
                                <label>The teacher communicates clearly</label>
                            </div>
                            <div className='question-5'>
                                <span className='serial-no'>5.</span>
                                <label>The teacher inspires me by his/her knowledge in  the subject</label>
                            </div>
                        </div>
                        <div className='dropdown-group'>


                            {subjectsQuestion.map((question, rowIndex) => (
                                <div key={rowIndex} className='dropdown-column'>

                                    {question.map((subject, columnIndex) => (
                                        <div key={columnIndex} className='dropdown-row'>
                                            <Form.Select className='dropdown' onChange={(e) => handleRate1(rowIndex, columnIndex, e)}>
                                                <option className='menu'>Rate</option>
                                                <option className='menu' value='1'>1</option>
                                                <option className='menu' value='2'>2</option>
                                                <option className='menu' value='3'>3</option>
                                                <option className='menu' value='4'>4</option>
                                                <option className='menu' value='5'>5</option>
                                            </Form.Select>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </tbody>
                </table>
                <div className='feedback'>
                    <div className='table-header'>
                        <div className='heading' id='heading-2'>B. TEACHING - LEARNING PROCESS</div>
                    </div>
                    <div className='feedback-body'>
                        <div className='questions' id='questions'>
                            <div className='question-1'>
                                <span className='serial-no'>6.</span>
                                <label>The teacher is punctual to the class</label>
                            </div>
                            <div className='question-2'>
                                <span className='serial-no'>7.</span>
                                <label>The teacher engages the class for the full duration  and completes the course in time</label>
                            </div>
                            <div className='question-3'>
                                <span className='serial-no'>8.</span>
                                <label>The teacher comes fully prepared for the class</label>
                            </div>
                            <div className='question-4'>
                                <span className='serial-no'>9.</span>
                                <label>The teacher provides guidance counseling in  academic and non - academic matters in/out side</label>
                            </div>
                            <div className='question-5'>
                                <span className='serial-no'>10.</span>
                                <label>The teacher encourages learning through problem  solving/ practical approach</label>
                            </div>
                        </div>
                        <div className='dropdown-group' style={{ marginTop: '-1%' }}>


                            {learningProcess.map((question, rowIndex) => (
                                <div key={rowIndex} className='dropdown-column'>

                                    {question.map((subject, columnIndex) => (
                                        <div key={columnIndex} className='dropdown-row'>
                                            <Form.Select className='dropdown' onChange={(e) => handleRate2(rowIndex, columnIndex, e)}>
                                                <option className='menu'>Rate</option>
                                                <option className='menu' value='1'>1</option>
                                                <option className='menu' value='2'>2</option>
                                                <option className='menu' value='3'>3</option>
                                                <option className='menu' value='4'>4</option>
                                                <option className='menu' value='5'>5</option>
                                            </Form.Select>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className='comments'>
                        {labs.map((lab, index) => (
                            <div className='comment'>
                                <div key={index} className='comment-name'>
                                    <span className='serial-no'>{labCount[index]}. </span>
                                    <label>Comment on {lab}:</label>
                                </div>
                                <div className='input'>
                                    <textarea placeholder='Comment Here...' onChange={(e) => handleComment(index, e)}></textarea>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </form>

            <button type="button" class="btn btn-success" id='btn' onClick={handleButton}>Comment on Faculty Performance   </button>
            {comments ?
                <div className='faculty-feedback-performance'>
                    <div className='comments'>
                        {subjects.map((faculty, index) => (
                            <div className='comment'>
                                <div key={index} className='comment-name'>
                                    <span className='serial-no'>{index = index + 1} . </span>
                                    <label>Comment on faculty{index}:</label>
                                </div>
                                <div className='input'>
                                    <textarea placeholder='Comment Here...' onChange={(e) => handleFacultyComment(index, e)}></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> : null}
            <button type="submit" class="btn btn-primary" id='submit-btn'>Submit</button>

        </div>
    );
}

export default New;