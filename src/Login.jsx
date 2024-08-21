import React, { useState } from "react";
import axios from "axios";

const Login = ({ toggleLoginForm }) => {
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 

    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/testing", loginData);
      const result = response.data;

      if (
        result.success &&
        result.data.length > 0 &&
        result.data[0].email === loginData.name &&
        result.data[0].password === loginData.password
      ) {
        setError("Login successful!");
        console.log("Login successful!");

     
        const userDataResponse = await axios.get("http://localhost:5000/testing");
        setUserData(userDataResponse.data); 
      } else {
        setError("Login failed.");
        console.log("Login failed.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2 className="text-uppercase text-center mb-5">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {userData && (
        <div className="alert alert-success">User data: {JSON.stringify(userData)}</div>
      )}
      <form onSubmit={handleLogin}>
        <div className="form-group mb-4">
          <input
            type="text"
            id="name"
            value={loginData.name}
            onChange={handleInputChange}
            className="form-control form-control-lg"
            placeholder="Username"
          />
        </div>

        <div className="form-group mb-4">
          <input
            type="password"
            id="password"
            value={loginData.password}
            onChange={handleInputChange}
            className="form-control form-control-lg"
            placeholder="Password"
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary btn-lg">
            Login
          </button>
        </div>
      </form>

      <p
        className="text-center text-muted mt-5 mb-0"
        onClick={toggleLoginForm} 
        style={{ cursor: "pointer" }}
      >
        Back to Register
      </p>
    </div>
  );
};

export default Login;
