import React, { useEffect, useState } from "react";
import { HeaderStrip } from "../../../styled-components/generaltags";
import { appConstants } from "../../../constants/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlusSquare, FaBookmark, FaRegBookmark } from "react-icons/fa";

const Backend = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [backEndData, setBackendData] = useState([]);
  const [backendLoading, setBackendLoading] = useState(false);
  const [updateQuestionBookmarkLoading, setupdateQuestionBookmarkLoading] =
    useState(false);

  useEffect(() => {
    getBackEndData();
  }, []);

  const getBackEndData = async () => {
    setBackendLoading(true);
    await axios
      .get(`${appConstants.base_url}questions/get/BE`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        setBackendData(dt);
        setBackendLoading(false);
        // console.log("login res: ", dt);
      })
      .catch((err) => {
        setBackendLoading(false);
        console.log("Error: ", err);
      });
  };
  const updateQuestionBookmark = async (data) => {
    setupdateQuestionBookmarkLoading(true);
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
        getBackEndData();
        setupdateQuestionBookmarkLoading(false);
      })
      .catch((err) => {
        setupdateQuestionBookmarkLoading(false);
        console.log("Error: ", err);
      });
  };

  return (
    <div>
      <HeaderStrip className="d-flex justify-content-between px-2 py-1">
        <h4>Back End</h4>
        <h4
          className="pointer"
          onClick={() => navigate("/question-edit/BE/add")}
        >
          <FaPlusSquare />
        </h4>
      </HeaderStrip>
      <div>
        {backEndData?.length > 0 ? (
          backEndData?.map((item, idx) => {
            return (
              <div
                key={idx}
                className="card p-2 my-2"
                onClick={() => navigate(`/question-details/${item._id}`)}
              >
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
                </div>{" "}
                <p>
                  <strong>Answer</strong>: {item?.answer}
                </p>
              </div>
            );
          })
        ) : (
          <span>Back end question not found</span>
        )}
      </div>
    </div>
  );
};

export default Backend;
