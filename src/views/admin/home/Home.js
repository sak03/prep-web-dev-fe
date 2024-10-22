import React, { useEffect, useState } from "react";
import { HeaderStrip, MainDiv } from "../../../styled-components/generaltags";
import { appConstants } from "../../../constants/constant";
import axios from "axios";
import AppHeader from "../../../componets/AppHeader";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const isMobile = window.matchMedia("(max-width: 575px)").matches;
  const [allPublicData, setAllPublicData] = useState(null);
  const [allPublicDataLoading, setAllPublicDataLoading] = useState(false);

  useEffect(() => {
    getAllPublicQuestions();
  }, []);

  const getAllPublicQuestions = async () => {
    setAllPublicDataLoading(true);
    await axios
      .get(`${appConstants.base_url}questions/getAll`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const dt = res.data;
        setAllPublicData(dt);
        setAllPublicDataLoading(false);
        // console.log("login res: ", dt);
      })
      .catch((err) => {
        setAllPublicDataLoading(false);
        console.log("Error: ", err);
      });
  };
  return (
    <MainDiv className="d-flex justify-content-center">
      <div 
      className={isMobile ? "" : "w-25 bg-light"}
      >
        <div
          className={isMobile ? "w-100" : "w-25"}
          style={{ position: "fixed", top: "0px", zIndex: 99 }}
        >
          <AppHeader />
        </div>
        <HeaderStrip
          className="d-flex justify-content-center px-2 py-1 shadow rounded mx-1"
          style={{ marginTop: "4rem", zIndex: 9 }}
        >
          <div className="d-flex flex-column">
            <h4 className="m-0">Welcome to Prep Web Dev!</h4>
            <small>Prepare yourself for your next dream job!!</small>
          </div>
        </HeaderStrip>
        <div className="p-2">
          {allPublicData?.length > 0 ? (
            allPublicData?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="card p-2 my-2 pointer"
                  onClick={() => navigate(`/login`)}
                >
                  <div className="d-flex justify-content-between">
                    <p className="m-0">
                      <strong>Question</strong>: {item?.question}
                    </p>
                  </div>
                  <p className="m-0">
                    <strong>Answer</strong>: {item?.answer}
                  </p>
                  <p className="d-flex justify-content-end m-0"><small>Details {">>"}</small></p>
                </div>
              );
            })
          ) : (
            <span>Question not found. Please login/register to add your question.</span>
          )}
        </div>
      </div>
    </MainDiv>
  );
};

export default Home;
