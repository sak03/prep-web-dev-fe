import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderStrip } from "../../../styled-components/generaltags";
import { FaPencilAlt } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const loggedinUserInfo = JSON.parse(localStorage.getItem("userInfo"));


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  
  return (
    <div>
      <HeaderStrip className="d-flex justify-content-between px-2 py-1">
        <h4>Profile</h4>
        <u className="text-danger pointer" onClick={handleLogout}>
          Logout
        </u>
      </HeaderStrip>
      <div className="mt-3 p-1">
        <div className="d-flex justify-content-between">
          <h6>Basic Info</h6>
          <span
            className="pointer"
            onClick={() => navigate(`/user-edit/${loggedinUserInfo.id}`)}
          >
            <FaPencilAlt />
          </span>
        </div>
        <div>
          <strong>Name: </strong>
          {loggedinUserInfo?.name}
        </div>
        <div>
          <strong>Email: </strong>
          {loggedinUserInfo?.email}
        </div>
        <div>
          <strong>Mobile: </strong>
          {loggedinUserInfo?.mobile}
        </div>
        <div>
          <strong>User Type: </strong>
          {loggedinUserInfo?.userType}
        </div>
        <div>
          <strong>Status: </strong>
          <span
            className={
              loggedinUserInfo?.userStatus ? "text-success" : "text-danger"
            }
          >
            {loggedinUserInfo?.userStatus ? "Active" : "Inactive"}
          </span>{" "}
        </div>
        <div>
          <strong>Date of Birth: </strong>
          {loggedinUserInfo?.dateOfBirth || "NA"}
        </div>
        <div>
          <strong>City: </strong>
          {loggedinUserInfo?.city}
        </div>
      </div>
    </div>
  );
};

export default Profile;
