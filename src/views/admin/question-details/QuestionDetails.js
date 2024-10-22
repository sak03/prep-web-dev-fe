import React, { useEffect, useRef, useState } from "react";
import { HeaderStrip } from "../../../styled-components/generaltags";
import { useParams } from "react-router-dom";
import { appConstants } from "../../../constants/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBookmark,
  FaCheck,
  FaCopy,
  FaLock,
  FaLockOpen,
  FaPencilAlt,
  FaRegBookmark,
} from "react-icons/fa";
import { findCatagory } from "../../../globat-functions/findCategoryName";
import { updateQuestionService } from "../../../services/questionsServices";

const QuestionDetails = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const codeRef = useRef();
  const token = localStorage.getItem("token");
  const [questionDetailsData, setQuestionDetailsData] = useState(null);
  const [questionDetailsLoading, setQuestionDetailsLoading] = useState(false);
  const [isCopyClicked, setIsCopyClicked] = useState(false);
  // console.log("questionDetailsData", questionDetailsData);

  useEffect(() => {
    getQuestionDetailsData();
  }, []);

  const getQuestionDetailsData = async () => {
    setQuestionDetailsLoading(true);
    await axios
      .get(`${appConstants.base_url}questions/getDetails/${questionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        setQuestionDetailsData(dt);
        setQuestionDetailsLoading(false);
        // console.log("login res: ", dt);
      })
      .catch((err) => {
        setQuestionDetailsLoading(false);
        console.log("Error: ", err);
      });
  };

  const copyToClipboard = async () => {
    const code = codeRef.current.innerText;
    await navigator.clipboard
      .writeText(code)
      .then((res) => {
        console.error("Copied", res);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const updateBookmarkRequest = async (postDataValue, updateType) => {
    try {
      const postData =
        updateType === "bookmarked"
          ? {
              isBookmarked: !postDataValue,
            }
          : {
            isPrivate: !postDataValue,
            };
      const result = await updateQuestionService(
        postData,
        questionDetailsData?._id
      );
      const res = result;
      getQuestionDetailsData();
      console.log("res", res);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div>
      <HeaderStrip className="d-flex justify-content-between px-2 py-1">
        <h4>
          <span className="mx-2 pointer" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </span>{" "}
          Question Details
        </h4>
        <h4
          className="pointer"
          onClick={() =>
            navigate(
              `/question-edit/${questionDetailsData?.category}/${questionDetailsData?._id}`
            )
          }
        >
          <FaPencilAlt />
        </h4>
      </HeaderStrip>
      <div className="mt-3 p-2">
        <div className="d-flex justify-content-between">
          <span
            onClick={() =>
              updateBookmarkRequest(questionDetailsData?.isPrivate, "private")
            }
          >
            {questionDetailsData?.isPrivate ? <FaLock /> : <FaLockOpen />}
          </span>
          <span
            onClick={() =>
              updateBookmarkRequest(
                questionDetailsData?.isBookmarked,
                "bookmarked"
              )
            }
          >
            {questionDetailsData?.isBookmarked ? (
              <FaBookmark />
            ) : (
              <FaRegBookmark />
            )}
          </span>
        </div>
        <p className="my-2">
          <strong>Category</strong>:{" "}
          {findCatagory(questionDetailsData?.category)}
        </p>
        <p>
          <strong>Sub Category</strong>: {questionDetailsData?.subCategory}
        </p>
        <p className="m-0">
          <strong>Question</strong>: {questionDetailsData?.question}
        </p>
        <p>
          <strong>Answer</strong>: {questionDetailsData?.answer}
        </p>
        <p className="m-0">
          <strong>Code</strong>: &nbsp;
          {questionDetailsData?.code ? (
            <div className="card bg-dark text-white">
              <span className="d-flex justify-content-between bg-secondary py-1 px-2">
                <small>JavaScript</small>
                <small
                  className="pointer"
                  onClick={() => {
                    setIsCopyClicked(true);
                    copyToClipboard();
                    setTimeout(() => setIsCopyClicked(false), 3000);
                  }}
                >
                  {isCopyClicked ? <FaCheck /> : <FaCopy />}
                </small>
              </span>
              <div className="p-2">
                <pre id="codeBlock">
                  <code ref={codeRef}>{questionDetailsData?.code}</code>
                </pre>
              </div>
            </div>
          ) : (
            "NA"
          )}
        </p>
      </div>
    </div>
  );
};

export default QuestionDetails;
