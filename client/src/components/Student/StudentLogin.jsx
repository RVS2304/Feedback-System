import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../SharedComponents/SubmitButton/SubmitButton";
import "./StudentLogin.css";

const StudentLogin = ({dashboardRoute}) => {

  // const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    navigate(dashboardRoute);
  }, [navigate]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="student-login">
        <img className="bg-icon" alt="" src="/studentloginbg.jpg" />
        <div className="student-rectangle-parent">
        <div className="student-login-wrapper">
          <h2 className="student-login-text">Login</h2>
        </div>
        <div className="roll-number-parent">
          <div className="roll-number">Roll Number</div>
          <input type="text" name="rollnumber" id="rollNumber" className="student-input-rollno" required />
        </div>
        <SubmitButton />
        </div>
      </div>
    </form>
  );
}

export default StudentLogin;









// // import LoginComponent from "./LoginComponent";
// import "./StudentLogin.css";

// const StudentLogin = () => {
//   return (
//     <div className="student-login">
//       <img className="student-loginbg-icon" alt="" src="/studentloginbg.jpg" />
//     <form className="student-login-container-parent">
//       <div className="student-login-container" />
//       <div className="student-login-wrapper">
//         <h1 className="student-login-text">Login</h1>
//       </div>
//       <div className="student-input-parent">
//         <div className="student-text">Roll Number</div>
//         <div className="student-user-input">
//           <input type="text" name="username" id="username" className="student-userinput" />
//         </div>
//       </div>
      
//       <div className="student-submit-wrapper">
//         <button className="student-submit">
//           <div className="student-submit1">Submit</div>
//         </button>
//       </div>
//     </form>
//     </div>
//   );
// }

// export default StudentLogin;
