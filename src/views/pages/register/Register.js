import React, { useState } from "react";
import { MainDiv } from "../../../styled-components/generaltags";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { DarkButton, LightButton } from "../../../styled-components/buttons";
import axios from "axios";
import { appConstants } from "../../../constants/constant";
import swal from "sweetalert";

const Register = () => {
  const navigate = useNavigate();
  const isMobile = window.matchMedia("(max-width: 575px)").matches;
  const [registerLoading, setRegisterLoading] = useState(false);
  const userTypeList = [
    { name: "Student", code: "Student" },
    { name: "Professional", code: "Professional" },
  ];

  const registerFormik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      mobile: "",
      password: "",
      userType: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.fName) {
        errors.fName = "Please enter first name";
      }
      if (!data.lName) {
        errors.lName = "Please enter last name";
      }
      if (!data.email) {
        errors.email = "Please enter email Id";
      }
      if (!data.mobile) {
        errors.mobile = "Please enter mobile no.";
      }
      if (!data.password) {
        errors.password = "Please enter password";
      }
      return errors;
    },
    onSubmit: (data) => {
      registerRequest(data);
      //   console.log("form submit", data);
    },
  });
  const isRegisterFormFieldValid = (name) =>
    !!(registerFormik.touched[name] && registerFormik.errors[name]);
  const getRegisterFormErrorMessage = (name) => {
    return (
      isRegisterFormFieldValid(name) && (
        <small className="text-danger">{registerFormik.errors[name]}</small>
      )
    );
  };

  const registerRequest = async (data) => {
    setRegisterLoading(true);
    const postData = {
      city: "",
      dateOfBirth: null,
      email: data.email,
      mobile: data.mobile,
      name: `${data.fName} ${data.lName}`,
      password: data.password,
      userStatus: true,
      userType: data.userType,
    };
    // console.log('postData', data, postData)
    await axios
      .post(`${appConstants.base_url}user/create`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        swal({
          title: "Success",
          text: "You have been successfully registered",
          icon: "success",
          timer: 2500,
          buttons: false,
        });
        setTimeout(() => navigate("/"), 2500);
        setRegisterLoading(false);
      })
      .catch((err) => {
        setRegisterLoading(false);
        console.log("Error: ", err);
        swal({
            title: "Oops",
            text: "Something went wrong, Please try again!",
            icon: "success",
            timer: 2500,
            buttons: false,
          });
      });
  };


  return (
    <MainDiv
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className={isMobile ? "w-100 p-3" : "w-25 p-3"}>
        <div className="d-flex justify-content-center my-3">
          <h3>Prep Web Dev</h3>
        </div>
        <div className="mt-3 rounded p-3 shadow">
          <div className="d-flex justify-content-center my-1">
            <small>Join Us</small>
          </div>
          <form onSubmit={registerFormik.handleSubmit}>
            <div className="">
              <small htmlFor="categorySelect">
                First Name<b className="text-danger">*</b>
              </small>
              <input
                id="fName"
                type="text"
                placeholder="Enter first name"
                className="w-100 border-0 p-1 rounded"
                value={registerFormik.values.fName}
                onChange={registerFormik.handleChange}
              />
              {getRegisterFormErrorMessage("fName")}
            </div>
            <div className="my-2">
              <small htmlFor="categorySelect">
                Last Name<b className="text-danger">*</b>
              </small>
              <input
                id="lName"
                type="text"
                placeholder="Enter last"
                className="w-100 border-0 p-1 rounded"
                value={registerFormik.values.lName}
                onChange={registerFormik.handleChange}
              />
              {getRegisterFormErrorMessage("lName")}
            </div>
            <div className="">
              <small htmlFor="categorySelect">
                Email<b className="text-danger">*</b>
              </small>
              <input
                id="email"
                type="text"
                placeholder="Enter email Id"
                className="w-100 border-0 p-1 rounded"
                value={registerFormik.values.email}
                onChange={registerFormik.handleChange}
              />
              {getRegisterFormErrorMessage("email")}
            </div>
            <div className="my-2">
              <small htmlFor="categorySelect">
                Mobile<b className="text-danger">*</b>
              </small>
              <input
                id="mobile"
                type="text"
                placeholder="Enter mobile no"
                className="w-100 border-0 p-1 rounded"
                value={registerFormik.values.mobile}
                onChange={registerFormik.handleChange}
              />
              {getRegisterFormErrorMessage("mobile")}
            </div>
            <div className="d-flex flex-column">
              <small htmlFor="categorySelect">
                User Type<b className="text-danger">*</b>
              </small>
              <select
                id="userType"
                value={registerFormik.values.userType}
                onChange={registerFormik.handleChange}
                className="border-0 p-1 rounded"
              >
                <option value="">Select User Type</option>
                {userTypeList?.map((item, idx) => (
                  <option key={idx} value={item.code}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-100 my-2">
              <small htmlFor="categorySelect">
                Password<b className="text-danger">*</b>
              </small>
              <input
                id="password"
                type="text"
                placeholder="Enter password"
                className="w-100 border-0 p-1 rounded"
                value={registerFormik.values.password}
                onChange={registerFormik.handleChange}
              />
              {getRegisterFormErrorMessage("password")}
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <LightButton
                type="button"
                className="border-1 py-1 px-2 rounded"
                onClick={() => {
                  registerFormik.resetForm();
                  navigate(-1);
                }}
              >
                Cancel
              </LightButton>
              <DarkButton type="submit" className="border-0 py-1 px-2 rounded">
                Submit
              </DarkButton>
            </div>
          </form>
        </div>
      </div>
    </MainDiv>
  );
};

export default Register;
