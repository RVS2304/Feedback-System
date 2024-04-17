import React from 'react';
import "./LoginOptions.css";
import { Link } from 'react-router-dom';

const LoginOptions = ({visible}) => {
    // Define functions for handling login options

    const handleStudentLogin = () => {
        // Logic for handling student login
        console.log('Student login clicked');
    };

    const handleFacultyLogin = () => {
        // Logic for handling faculty login
        console.log('Faculty login clicked');
    };

    const handleHODLogin = () => {
        // Logic for handling HOD login
        console.log('HOD login clicked');
    };

    const handleAdminLogin = () => {
        // Logic for handling admin login
        console.log('Admin login clicked');
    };

    return (
        <div className={`login-options ${visible ? "visible" : ""}`}>

            <div className='login-options-container'>
            <Link to='/student-login'><button onClick={handleStudentLogin} className='login-option-button'>Student</button></Link>
            </div>
            <div className='login-options-container'>
            <Link to='/faculty-login'><button onClick={handleFacultyLogin} className='login-option-button'>Faculty</button></Link>    
            </div>
            <div className='login-options-container'>
            <Link to='/hod-login'><button onClick={handleHODLogin} className='login-option-button'>HOD</button></Link>
            </div>
            <div className='login-options-container'>
            <Link to='/admin-login'><button onClick={handleAdminLogin} className='login-option-button'>Admin</button></Link>
            </div>
        </div>
    );
};

export default LoginOptions;