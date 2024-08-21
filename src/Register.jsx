import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import Table from "./Table";

const initData = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const [storeData, setStoreData] = useState(initData);







  const [loginForm, setLoginForm] = useState(false);
  const [error, setError] = useState(null);
  
  const [showTable, setShowTable] = useState(false); 
  const backgroundImageUrl = "";



  useEffect(() => {
    setStoreData(initData);
  }, []);

  const inputHandle = (e) => {
    e.preventDefault();
    if (!storeData.name || !storeData.email || !storeData.password) {
      setError("Please fill out all fields.");
      return;
    }

    axios
      .post("http://localhost:5000/testing", storeData)
      .then((response) => {
        console.log(response.data);
        alert("Registration successful!");
        setStoreData(initData);
        setError(null);
        setShowTable(true); 
      })
      .catch((error) => {
        setError("Registration failed!");
        console.log(error);
      });
  };

  const toggleLoginForm = () => {
    setLoginForm(!loginForm);
  };

  const toggleRegisterForm = () => {
    setLoginForm(true);
  };

  return (
    <section className="vh-100 bg-image"   style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  {loginForm ? (
                    <Login toggleLoginForm={toggleLoginForm} />
                  ) : (
                    <div>
                       <h2 className="text-uppercase text-center mb-5">
                        <span style={{ color: "red" }}>Create</span> an <span style={{ color: "blue" }}>account</span>
                      </h2>

                      {error && <div className="alert alert-danger">{error}</div>}

                      <form onSubmit={inputHandle}>
                        <div className="form-group mb-4">
                          <input
                            type="text"
                            id="name"
                            value={storeData.name}
                            onChange={(e) =>
                              setStoreData((prevState) => ({
                                ...prevState,
                                [e.target.id]: e.target.value,
                              }))
                            }
                            className="form-control form-control-lg"
                            placeholder="Your Name"
                          />
                        </div>

                        <div className="form-group mb-4">
                          <input
                            type="email"
                            id="email"
                            value={storeData.email}
                            onChange={(e) =>
                              setStoreData((prevState) => ({
                                ...prevState,
                                [e.target.id]: e.target.value,
                              }))
                            }
                            className="form-control form-control-lg"
                            placeholder="Your Email"
                          />
                        </div>

                        <div className="form-group mb-4">
                          <input
                            type="password"
                            id="password"
                            value={storeData.password}
                            onChange={(e) =>
                              setStoreData((prevState) => ({
                                ...prevState,
                                [e.target.id]: e.target.value,
                              }))
                            }
                            className="form-control form-control-lg"
                            placeholder="Password"
                          />
                        </div>

                        <div className="d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn btn-success btn-lg gradient-custom-4 text-body"
                          >
                            Register
                          </button>
                        </div>
                      </form>

                      {showTable && <Table />}
                      {!showTable && (
                        <button
                          className="btn btn-primary mt-3"
                          onClick={() => setShowTable(true)}
                        >
                          Show Table
                        </button>
                      )}

                      <p
                        className="text-center text-muted mt-5 mb-0"
                        onClick={toggleRegisterForm}
                        style={{ cursor: "pointer" }}
                      >
                        Have already an account?{" "}
                        <span className="fw-bold text-body">Login here</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
