import React, { useEffect, useState } from "react";
import { HeaderStrip } from "../../../styled-components/generaltags";
import { appConstants } from "../../../constants/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlusSquare, FaBookmark, FaRegBookmark } from "react-icons/fa";

const Database = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [databaseData, setDatabaseData] = useState([]);
  const [databaseLoading, setDatabaseLoading] = useState(false);
  const [updateQuestionBookmarkLoading, setupdateQuestionBookmarkLoading] =
    useState(false);

  useEffect(() => {
    getDatabaseData();
  }, []);

  const getDatabaseData = async () => {
    setDatabaseLoading(true);
    await axios
      .get(`${appConstants.base_url}questions/get/DB`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        setDatabaseData(dt);
        setDatabaseLoading(false);
        // console.log("login res: ", dt);
      })
      .catch((err) => {
        setDatabaseLoading(false);
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
        getDatabaseData();
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
        <h4>Databse</h4>
        <h4
          className="pointer"
          onClick={() => navigate("/question-edit/DB/add")}
        >
          <FaPlusSquare />
        </h4>
      </HeaderStrip>
      <div>
        {databaseData?.length > 0 ? (
          databaseData?.map((item, idx) => {
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
          <span>Database question not found</span>
        )}
      </div>
    </div>
  );
};

export default Database;
