import React from "react";
import { DarkButton } from "../../../styled-components/buttons";
import { MainDiv } from "../../../styled-components/generaltags";
import { useFormik } from "formik";
import axios from "axios";
import { appConstants } from "../../../constants/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const isMobile = window.matchMedia("(max-width: 575px)").matches;
  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.username) {
        errors.username = "Please enter email";
      }
      if (!data.password) {
        errors.password = "Please enter password";
      }
      return errors;
    },
    onSubmit: (data) => {
      loginRequest(data);
    },
  });
  const isLoginFormFieldValid = (name) =>
    !!(loginFormik.touched[name] && loginFormik.errors[name]);
  const getLoginFormErrorMessage = (name) => {
    return (
      isLoginFormFieldValid(name) && (
        <small className="text-danger">{loginFormik.errors[name]}</small>
      )
    );
  };
  const loginRequest = async (data) => {
    const postData = {
      email: data.username,
      password: data.password,
    };
    await axios
      .post(`${appConstants.base_url}user/login`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        localStorage.setItem("token", dt.token);
        localStorage.setItem("userInfo", JSON.stringify(dt));
        navigate("/front-ent");
        // console.log("login res: ", dt);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  return (
    <MainDiv
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className={isMobile ? "w-100 p-3" : "w-25 p-3"}>
        <div className="d-flex justify-content-center my-5">
          <h3>Welcome to Prep Web Dev</h3>
        </div>
        <div className="mt-3 rounded p-3 shadow">
          <div className="d-flex justify-content-center my-3">
            <small>Login</small>
          </div>
          <form onSubmit={loginFormik.handleSubmit}>
            <div className="">
              <input
                id="username"
                type="text"
                placeholder="Enter email Id"
                className="w-100 border-0 p-1 rounded"
                value={loginFormik.values.username}
                onChange={loginFormik.handleChange}
              />
              {getLoginFormErrorMessage("username")}
            </div>
            <div className="w-100 my-2">
              <input
                id="password"
                type="text"
                placeholder="Enter password"
                className="w-100 border-0 p-1 rounded"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
              />
              {getLoginFormErrorMessage("password")}
            </div>
            <small className="pointer">
              <u onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </u>
            </small>
            <div className="mt-2">
              {/* <LightButton type="button" onClick={() => loginFormik.resetForm()}>Reset</LightButton> */}
              <DarkButton type="submit" className="w-100 border-0 p-1 rounded">
                Login
              </DarkButton>
            </div>
            <small className="pointer">
              Don't have account?{" "}
              <u onClick={() => navigate("/register")}>Sign Up</u>
            </small>
          </form>
        </div>
      </div>
    </MainDiv>
  );
};

export default Login;
