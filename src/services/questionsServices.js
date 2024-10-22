import axios from "axios";
import { appConstants } from "../constants/constant";
const token = localStorage.getItem("token");

export const updateQuestionService = async (postData, questionId) => {
  try {
    const responce = await axios.patch(
      `${appConstants.base_url}questions/update/${questionId}`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const dt = responce.data;
    return dt;
  } catch (error) {
    console.log("Error: ", error);
  }
};
