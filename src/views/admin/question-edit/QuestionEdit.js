import React, { useEffect, useState } from "react";
import { HeaderStrip } from "../../../styled-components/generaltags";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useFormik } from "formik";
import { DarkButton, LightButton } from "../../../styled-components/buttons";
import axios from "axios";
import { appConstants } from "../../../constants/constant";
import { catagoryList } from "../../../globat-functions/findCategoryName";

const QuestionEdit = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { category, questionId } = useParams();
  const loggedinUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [addUpdateLoading, setAddUpdateLoading] = useState(false);

  useEffect(() => {
    if (questionId !== "add") {
      getQuestionDetailsData();
    } else {
      questionAddEditFormik.setFieldValue("category", category);
    }
  }, []);

  const questionAddEditFormik = useFormik({
    initialValues: {
      isPrivate: false,
      category: "",
      subcategory: "",
      question: "",
      answer: "",
    },
    validate: (data) => {
      let errors = {};
      if (!data.category) {
        errors.category = "Please select category";
      }
      if (!data.question) {
        errors.question = "Please enter question";
      }
      if (!data.answer) {
        errors.answer = "Please enter answer";
      }
      return errors;
    },
    onSubmit: (data) => {
      questionId === "add"
        ? addQuestionRequest(data)
        : updateQuestionRequest(data);
    },
  });
  const isQuestionAddEditFormFieldValid = (name) =>
    !!(
      questionAddEditFormik.touched[name] && questionAddEditFormik.errors[name]
    );
  const getQuestionAddEditFormErrorMessage = (name) => {
    return (
      isQuestionAddEditFormFieldValid(name) && (
        <small className="text-danger">
          {questionAddEditFormik.errors[name]}
        </small>
      )
    );
  };

  const getQuestionDetailsData = async () => {
    await axios
      .get(`${appConstants.base_url}questions/getDetails/${questionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        questionAddEditFormik.setFieldValue("isPrivate", dt.isPrivate);
        questionAddEditFormik.setFieldValue("question", dt.question);
        questionAddEditFormik.setFieldValue("answer", dt.answer);
        questionAddEditFormik.setFieldValue("category", dt.category);
        questionAddEditFormik.setFieldValue("subcategory", dt.subCategory);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  const addQuestionRequest = async (data) => {
    setAddUpdateLoading(true);
    const postData = {
      answer: data.answer,
      category: data.category,
      code: data.code,
      createdBy: loggedinUserInfo.id,
      isBookmarked: false,
      isPrivate: data.isPrivate,
      question: data.question,
      subCategory: data.subcategory,
    };
    // console.log("postData", data, postData);
    await axios
      .post(`${appConstants.base_url}questions/create`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        setAddUpdateLoading(false);
        navigate(-1);
      })
      .catch((err) => {
        setAddUpdateLoading(false);
        console.log("Error: ", err);
      });
  };

  const updateQuestionRequest = async (data) => {
    setAddUpdateLoading(true);
    const postData = {
      answer: data.answer,
      category: data.category,
      code: data.code,
      createdBy: loggedinUserInfo.id,
      isBookmarked: false,
      isPrivate: data.isPrivate,
      question: data.question,
      subCategory: data.subcategory,
    };
    // console.log("postData", data, postData);
    await axios
      .patch(
        `${appConstants.base_url}questions/update/${questionId}`,
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
        setAddUpdateLoading(false);
        navigate(-1);
      })
      .catch((err) => {
        setAddUpdateLoading(false);
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
          <span>{questionId === "add" ? "Add" : "Update"}</span> Question
        </h4>
      </HeaderStrip>
      <div className="p-3 shadow rounded">
        <form onSubmit={questionAddEditFormik.handleSubmit}>
          <div className="d-flex flex-column">
            <label htmlFor="isPrivate">Is Private</label>
            <select
              id="isPrivate"
              value={questionAddEditFormik.values.isPrivate}
              onChange={questionAddEditFormik.handleChange}
              className="border-1 p-1 rounded"
            >
              <option value="">Select Category</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="categorySelect">
              Category<b className="text-danger">*</b>
            </label>
            <select
              id="category"
              value={questionAddEditFormik.values.category}
              onChange={questionAddEditFormik.handleChange}
              className="border-1 p-1 rounded"
            >
              <option value="">Select Category</option>
              {catagoryList?.map((item, idx) => (
                <option key={idx} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <small htmlFor="question">Sub Category</small>
            <input
              id="subcategory"
              type="text"
              placeholder="Enter question sub category"
              className="w-100 border-1 p-1 rounded"
              value={questionAddEditFormik.values.subcategory}
              onChange={questionAddEditFormik.handleChange}
            />
            {getQuestionAddEditFormErrorMessage("subcategory")}
          </div>
          <div className="">
            <small htmlFor="question">
              Question<b className="text-danger">*</b>
            </small>
            <input
              id="question"
              type="text"
              placeholder="Enter question"
              className="w-100 border-1 p-1 rounded"
              value={questionAddEditFormik.values.question}
              onChange={questionAddEditFormik.handleChange}
            />
            {getQuestionAddEditFormErrorMessage("question")}
          </div>
          <div className="w-100 my-1">
            <small htmlFor="answer">
              Answer<b className="text-danger">*</b>
            </small>
            <textarea
              id="answer"
              placeholder="Enter answer"
              className="w-100 border-1 p-1 rounded"
              rows="3"
              value={questionAddEditFormik.values.answer}
              onChange={questionAddEditFormik.handleChange}
            />
            {getQuestionAddEditFormErrorMessage("answer")}
          </div>
          <div className="w-100">
            <small htmlFor="code">Code</small>
            <textarea
              id="code"
              placeholder="Enter code"
              className="w-100 border-1 p-1 rounded"
              rows="3"
              value={questionAddEditFormik.values.code}
              onChange={questionAddEditFormik.handleChange}
            />
            {getQuestionAddEditFormErrorMessage("code")}
          </div>
          <div className="mt-3 d-flex justify-content-between">
            <LightButton
              type="button"
              onClick={() => {
                navigate(-1);
                questionAddEditFormik.resetForm();
              }}
              className="border-0 px-2 py-1 rounded"
            >
              Cancel
            </LightButton>
            <DarkButton type="submit" className="border-0 px-2 py-1 rounded">
              Submit
            </DarkButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionEdit;
