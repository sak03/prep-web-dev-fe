import React from "react";
import { MainDiv } from "../../../styled-components/generaltags";
import { DarkButton, LightButton } from "../../../styled-components/buttons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { appConstants } from "../../../constants/constant";
import axios from "axios";
import swal from "sweetalert";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const isMobile = window.matchMedia("(max-width: 575px)").matches;
  const forgotPasswordFormik = useFormik({
    initialValues: {
      username: "",
      reusername: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.username) {
        errors.username = "Please enter email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.username)
      ) {
        errors.username = "Invalid email address. E.g. example@email.com";
      }
      if (!data.reusername) {
        errors.reusername = "Please re-enter email";
      } else if (data.username !== data.reusername) {
        errors.reusername = "Both emails must be same";
      }
      return errors;
    },
    onSubmit: (data) => {
      swal({
        title: "Oops",
        text: "This functionality is under maintanence. Please try after some time.",
        icon: "info",
        timer: 2500,
        buttons: false,
      });
    },
  });
  const isForgotPasswordFormFieldValid = (name) =>
    !!(forgotPasswordFormik.touched[name] && forgotPasswordFormik.errors[name]);
  const getForgotPasswordFormErrorMessage = (name) => {
    return (
      isForgotPasswordFormFieldValid(name) && (
        <small className="text-danger">
          {forgotPasswordFormik.errors[name]}
        </small>
      )
    );
  };

  return (
    <MainDiv
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className={isMobile ? "w-100 p-2" : "w-25 p-2"}>
        <div className="d-flex justify-content-center my-5">
          <h3>Prep Web Dev</h3>
        </div>

        <div className="mt-3 shadow p-3 rounded">
          <div className="d-flex justify-content-center my-3">
            <small>Forgot Password</small>
          </div>
          <form onSubmit={forgotPasswordFormik.handleSubmit}>
            <div className="">
              <input
                id="username"
                type="text"
                placeholder="Enter email Id"
                className="w-100 border-0 p-1 rounded"
                value={forgotPasswordFormik.values.username}
                onChange={forgotPasswordFormik.handleChange}
              />
              {getForgotPasswordFormErrorMessage("username")}
            </div>
            <div className="w-100 my-2">
              <input
                id="reusername"
                type="text"
                placeholder="Re Enter email Id"
                className="w-100 border-0 p-1 rounded"
                value={forgotPasswordFormik.values.reusername}
                onChange={forgotPasswordFormik.handleChange}
              />
              {getForgotPasswordFormErrorMessage("reusername")}
            </div>
            <div className="mt-2 d-flex justify-content-between">
              <LightButton
                type="button"
                className="border-1 py-1 px-2 rounded"
                onClick={() => {
                  forgotPasswordFormik.resetForm();
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

export default ForgotPassword;
