import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderStrip } from "../../../styled-components/generaltags";
import { FaArrowLeft } from "react-icons/fa";
import { DarkButton, LightButton } from "../../../styled-components/buttons";
import axios from "axios";
import { appConstants } from "../../../constants/constant";
import { useFormik } from "formik";

const UserEdit = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userAddUpdateLoading, setUserAddUpdateLoading] = useState(false);
  const userTypeList = [
    { name: "Student", code: "Student" },
    { name: "Professional", code: "Professional" },
  ];

  useEffect(() => {
    if (userId !== "add") {
      getUserById();
    }
  }, []);

  const userAddUpdateFormik = useFormik({
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
      if (!data.password && userId === "add") {
        errors.password = "Please enter password";
      }
      return errors;
    },
    onSubmit: (data) => {
      userId === "add" ? userAddRequest(data) : userUpdateRequest(data);
    },
  });
  const isUserAddUpdateFormFieldValid = (name) =>
    !!(userAddUpdateFormik.touched[name] && userAddUpdateFormik.errors[name]);
  const getUserAddUpdateFormErrorMessage = (name) => {
    return (
      isUserAddUpdateFormFieldValid(name) && (
        <small className="text-danger">
          {userAddUpdateFormik.errors[name]}
        </small>
      )
    );
  };

  const getUserById = async () => {
    await axios
      .get(`${appConstants.base_url}user/getById/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        const nameVal = dt?.name?.split(" ");
        userAddUpdateFormik.setFieldValue("fName", nameVal[0]);
        userAddUpdateFormik.setFieldValue("lName", nameVal[1]);
        userAddUpdateFormik.setFieldValue("email", dt.email);
        userAddUpdateFormik.setFieldValue("mobile", dt.mobile);
        userAddUpdateFormik.setFieldValue("userType", dt.userType);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const userAddRequest = async (data) => {
    setUserAddUpdateLoading(true);
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
    await axios
      .post(`${appConstants.base_url}user/create`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        navigate(-1);
        setUserAddUpdateLoading(false);
      })
      .catch((err) => {
        setUserAddUpdateLoading(false);
        console.log("Error: ", err);
      });
  };

  const userUpdateRequest = async (data) => {
    console.log("data", data);
    setUserAddUpdateLoading(true);
    const postData = {
      email: data.email,
      mobile: data.mobile,
      name: `${data.fName} ${data.lName}`,
      userStatus: true,
      userType: data.userType,
    };
    await axios
      .patch(`${appConstants.base_url}user/update/${userId}`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        navigate(-1);
        setUserAddUpdateLoading(false);
      })
      .catch((err) => {
        setUserAddUpdateLoading(false);
        console.log("Error: ", err);
      });
  };

  return (
    <div>
      <HeaderStrip className="d-flex justify-content-between px-2 py-1">
        <h4>
          <span className="mx-2 pointer" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </span>{" "}
          <span>{userId === "add" ? "Add" : "Update"}</span> User
        </h4>
      </HeaderStrip>
      <div className="mt-1 rounded p-3 shadow">
        <form onSubmit={userAddUpdateFormik.handleSubmit}>
          <div className="">
            <small htmlFor="categorySelect">
              First Name<b className="text-danger">*</b>
            </small>
            <input
              id="fName"
              type="text"
              placeholder="Enter first name"
              className="w-100 border-1 p-1 rounded"
              value={userAddUpdateFormik.values.fName}
              onChange={userAddUpdateFormik.handleChange}
            />
            {getUserAddUpdateFormErrorMessage("fName")}
          </div>
          <div className="my-2">
            <small htmlFor="categorySelect">
              Last Name<b className="text-danger">*</b>
            </small>
            <input
              id="lName"
              type="text"
              placeholder="Enter last"
              className="w-100 border-1 p-1 rounded"
              value={userAddUpdateFormik.values.lName}
              onChange={userAddUpdateFormik.handleChange}
            />
            {getUserAddUpdateFormErrorMessage("lName")}
          </div>
          <div className="">
            <small htmlFor="categorySelect">
              Email<b className="text-danger">*</b>
            </small>
            <input
              id="email"
              type="text"
              placeholder="Enter email Id"
              className="w-100 border-1 p-1 rounded"
              value={userAddUpdateFormik.values.email}
              onChange={userAddUpdateFormik.handleChange}
            />
            {getUserAddUpdateFormErrorMessage("email")}
          </div>
          <div className="my-2">
            <small htmlFor="categorySelect">
              Mobile<b className="text-danger">*</b>
            </small>
            <input
              id="mobile"
              type="text"
              placeholder="Enter mobile no"
              className="w-100 border-1 p-1 rounded"
              value={userAddUpdateFormik.values.mobile}
              onChange={userAddUpdateFormik.handleChange}
            />
            {getUserAddUpdateFormErrorMessage("mobile")}
          </div>
          <div className="d-flex flex-column">
            <small htmlFor="categorySelect">
              User Type<b className="text-danger">*</b>
            </small>
            <select
              id="userType"
              value={userAddUpdateFormik.values.userType}
              onChange={userAddUpdateFormik.handleChange}
              className="border-1 p-1 rounded"
            >
              <option value="">Select User Type</option>
              {userTypeList?.map((item, idx) => (
                <option key={idx} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {userId === "add" ? (
            <div className="w-100 my-2">
              <small htmlFor="categorySelect">
                Password<b className="text-danger">*</b>
              </small>
              <input
                id="password"
                type="text"
                placeholder="Enter password"
                className="w-100 border-1 p-1 rounded"
                value={userAddUpdateFormik.values.password}
                onChange={userAddUpdateFormik.handleChange}
              />
              {getUserAddUpdateFormErrorMessage("password")}
            </div>
          ) : (
            ""
          )}
          <div className="mt-2 d-flex justify-content-between">
            <LightButton
              type="button"
              className="border-1 p-1 rounded"
              onClick={() => {
                userAddUpdateFormik.resetForm();
                navigate(-1);
              }}
            >
              Cancel
            </LightButton>
            <DarkButton type="submit" className="border-0 p-1 rounded">
              Submit
            </DarkButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
