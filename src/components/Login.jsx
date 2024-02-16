import React, { useState } from "react";
import NavLogo from "../assets/images/logopng.png";
import ApiService from "../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailID: "",
    loginPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleTimeout = (errorMessage) => {
    const defaultErrorMessage = "An error occurred during login.";
    toast.error("Username or Password are incorrect" , { position: "top-center", autoClose: 1000 });
    console.log("Toast message displayed:", errorMessage || defaultErrorMessage);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await ApiService.postloginData(formData);
      const { user, token } = response;
  
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user)); // Convert user object to string
  
      // Reset the form after successful submission
      setFormData({
        emailID: "",
        loginPassword: "",
      });
  
      toast.success("Login successful!", { position: "top-center", autoClose: 1000 });
      console.log("Login successful!");
    
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);
      // navigate('/');
      // window.location.reload();
  
    } catch (error) {
      // Handle login failure (display error message, etc.)
      console.error(
        "Login failed:",
        error.response ? error.response.data.message : error.message
      );
      handleTimeout(error.response ? error.response.data.message : "Username or Password are incorrect");
    }


  };

  return (
    <div className="min-h-screen py-20  flex items-center">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row w-10/12 lg:w-3/12 md:w-6/12 shadow-lg  bg-slate-50 mx-auto rounded-xl">
          <div className="w-full  py-12 px-8">
            <h2 className="text-3xl mb-2">Login</h2>
            {/* <p className="mb-4">Have a great day !</p> */}
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <input
                  type="email"
                  placeholder="email"
                  name="emailID"
                  value={formData.emailID}
                  onChange={handleChange}
                  required
                  className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  placeholder="password"
                  name="loginPassword"
                  value={formData.loginPassword}
                  onChange={handleChange}
                  required
                  className="border border-gray-500 rounded-lg py-1 px-2 w-full"
                />
              </div>
              <div className="mt-5">
                <button
                  className="w-full bg-yellow-400 py-2 rounded-lg"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="mt-5 flex justify-center">
                <p>
                  Dont have a account?{" "}
                  <a href="/Register" className="text-blue-600">
                    Register !
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
