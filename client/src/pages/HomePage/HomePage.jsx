import Navbar from "../../components/Navbar/Navbar";
import Home from "../../components/Home/Home";
import LoginOptions from "../../components/LoginOptions/LoginOptions";
import "../../components/Home/Home.css";
import { useState } from "react";

const HomePage = () => {

  const [loginOptionsVisible, setLoginOptionsVisible] = useState(false);

  const toggleLoginOptions = () => {
    setLoginOptionsVisible(!loginOptionsVisible);
    console.log("Login Clicked");
  };


  return (
    <div className="home-1">
      <Navbar toggleLoginOptions={toggleLoginOptions} />
      {loginOptionsVisible && <LoginOptions visible={loginOptionsVisible} />}
      <Home />
    </div>
  );
};

export default HomePage;