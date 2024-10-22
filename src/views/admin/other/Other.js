import React, { useEffect, useState } from "react";
import { HeaderStrip } from "../../../styled-components/generaltags";
import { appConstants } from "../../../constants/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlusSquare, FaBookmark, FaRegBookmark } from "react-icons/fa";

const Other = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [otherData, setOtherData] = useState([]);
  const [otherLoading, setOtherLoading] = useState(false);
  const [updateQuestionBookmarkLoading, setupdateQuestionBookmarkLoading] =
    useState(false);

  useEffect(() => {
    getOtherData();
  }, []);

  const getOtherData = async () => {
    setOtherLoading(true);
    await axios
      .get(`${appConstants.base_url}questions/get/Other`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        setOtherData(dt);
        setOtherLoading(false);
        // console.log("login res: ", dt);
      })
      .catch((err) => {
        setOtherLoading(false);
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
        getOtherData();
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
        <h4>Other</h4>
        <h4
          className="pointer"
          onClick={() => navigate("/question-edit/Other/add")}
        >
          <FaPlusSquare />
        </h4>
      </HeaderStrip>
      <div>
        {otherData?.length > 0 ? (
          otherData?.map((item, idx) => {
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
                </div>
                <p>
                  <strong>Answer</strong>: {item?.answer}
                </p>
              </div>
            );
          })
        ) : (
          <span>Other question not found</span>
        )}
      </div>
    </div>
  );
};

export default Other;
