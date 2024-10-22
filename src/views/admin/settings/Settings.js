import React, { useEffect, useState } from "react";
import { HeaderStrip } from "../../../styled-components/generaltags";
import { FaPencilAlt, FaTrashAlt, FaSync, FaTimes, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { appConstants } from "../../../constants/constant";
import { DarkButton } from "../../../styled-components/buttons";

const Settings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const loggedinUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [allUserData, setAllUserData] = useState([]);
  const [allUserLoading, setAllUserLoading] = useState(false);
  const [viewMode, setViewMode] = useState(0);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [savedQuestionLoading, setSavedQuestionLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);
  //   console.log("loggedinUserInfo", loggedinUserInfo);

  useEffect(() => {
    getSavedQuestionsData();
  }, []);

  const getAllUsers = async () => {
    setAllUserLoading(true);
    await axios
      .get(`${appConstants.base_url}user/get`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        setAllUserData(dt);
        setAllUserLoading(false);
        setViewMode(1);
        // console.log("all users: ", dt);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setAllUserLoading(false);
      });
  };

  const getSavedQuestionsData = async () => {
    setSavedQuestionLoading(true);
    await axios
      .get(`${appConstants.base_url}questions/savedQuestions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        setSavedQuestions(dt);
        setSavedQuestionLoading(false);
        setViewMode(0);
        // console.log("login res: ", dt);
      })
      .catch((err) => {
        setSavedQuestionLoading(false);
        console.log("Error: ", err);
      });
  };

  const updatePasswordRequest = async () => {
    setUpdatePasswordLoading(true);
    const postData = {
      password: newPassword,
    };
    // console.log('postData', postData, loggedinUserInfo?.id)
    await axios
      .patch(
        `${appConstants.base_url}user/update/${loggedinUserInfo?.id}`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const dt = res.data;
        setShowChangePassword(false);
        setNewPassword("");
        setUpdatePasswordLoading(false);
      })
      .catch((err) => {
        setUpdatePasswordLoading(false);
        console.log("Error: ", err);
      });
  };

  const updateQuestionBookmark = async (data) => {
    const postData = {
      isBookmarked: !data.isBookmarked,
    };
    await axios
      .patch(
        `${appConstants.base_url}questions/update/${data?._id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const dt = res.data;
        getSavedQuestionsData();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  return (
    <div>
      <HeaderStrip className="d-flex justify-content-between px-2 py-1">
        <h4>Settings</h4>
      </HeaderStrip>
      <div className="mt-3 p-1">
        <div className="d-flex justify-content-between">
          <h6>Change Password</h6>
          <span className="pointer">
            {showChangePassword ? (
              <FaTimes
                onClick={() => {
                  setShowChangePassword(false);
                  setNewPassword("");
                }}
              />
            ) : (
              <FaPencilAlt onClick={() => setShowChangePassword(true)} />
            )}
          </span>
        </div>
      </div>
      {showChangePassword ? (
        <>
          <div className="line-divider my-0"></div>
          <div className="d-flex p-2">
            <div className="w-75">
              <small htmlFor="categorySelect">Password</small>
              <input
                id="password"
                type="text"
                placeholder="Enter new password"
                className="w-100 border-1 p-1 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="w-25 mt-4 d-flex justify-content-end">
              <DarkButton
                type="button"
                className="border-0 py-1 px-2 rounded"
                onClick={() => updatePasswordRequest()}
              >
                Submit
              </DarkButton>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="line-divider my-2"></div>
      <div className="d-flex justify-content-between p-1">
        <strong
          className={
            viewMode === 0 ? "setting-active-button" : "setting-button"
          }
          onClick={() => {
            getSavedQuestionsData();
            setViewMode(0);
            setAllUserData([]);
          }}
        >
          Saved Questions
        </strong>
        {loggedinUserInfo?.userType === "Admin" ? (
          <>
            <strong
              className={
                viewMode === 1 ? "setting-active-button" : "setting-button"
              }
              onClick={() => {
                setViewMode(1);
                getAllUsers();
                setSavedQuestions(null);
              }}
            >
              All Users
            </strong>
            <strong
              className="setting-button"
              onClick={() => navigate(`/user-edit/add`)}
            >
              + Add User
            </strong>
          </>
        ) : (
          ""
        )}
      </div>
      {allUserLoading ? (
        <span>Loading ...</span>
      ) : (
        <div>
          {allUserData?.length > 0 && viewMode === 1
            ? allUserData?.map((item, idx) => {
                return (
                  <div key={idx} className="card p-2 my-2">
                    <div className="d-flex justify-content-between">
                      <span>
                        <strong>Name: </strong>
                        {item?.name}
                      </span>
                      <span>
                        <FaPencilAlt
                          className="mx-2 pointer"
                          onClick={() => navigate(`/user-edit/${item._id}`)}
                        />{" "}
                        {item?.userType !== "Admin" ? (
                          <FaTrashAlt
                            className="text-danger pointer"
                            onClick={() =>
                              console.log("User delete button clicked!")
                            }
                          />
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <div>
                      <strong>Email: </strong>
                      {item?.email}
                    </div>
                    <div>
                      <strong>Mobile: </strong>
                      {item?.mobile}
                    </div>
                    <div>
                      <strong>User Type: </strong>
                      {item?.userType}
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>
                        <strong>Status: </strong>
                        <span
                          className={
                            item?.userStatus ? "text-success" : "text-danger"
                          }
                        >
                          {item?.userStatus ? "Active" : "Inactive"}
                        </span>
                      </span>
                      <span>
                       {item?.userType !== "Admin" ?  <FaSync
                          onClick={() =>
                            console.log("User status update button clicked!")
                          }
                        />:""}
                      </span>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      )}
      {savedQuestionLoading ? (
        <span>Loading ...</span>
      ) : (
        <div>
          {savedQuestions?.length > 0 && viewMode === 0
            ? savedQuestions?.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="card p-2 my-2"
                    onClick={() => navigate(`/question-details/${item._id}`)}
                  >
                    {/* <div>
                      <strong>Question: </strong>
                      {item?.question}
                    </div> */}
                    <div className="d-flex justify-content-between">
                  <p className="m-0">
                    <strong>Question</strong>: {item?.question}
                  </p>
                  <span
                    className="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuestionBookmark(item);
                    }}
                  >
                    {item?.isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                  </span>
                </div>
                    <div>
                      <strong>Answer: </strong>
                      {item?.answer}
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      )}
    </div>
  );
};

export default Settings;
