import React from "react";
import AppHeader from "../componets/AppHeader";
import AppContents from "../componets/AppContents";
import AppFooter from "../componets/AppFooter";

const DefaultLayout = () => {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 575px)").matches;

  const singleLayoutUI = () => {
    return (
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div
          className={isMobile ? "w-100 bg-white" :"w-25 bg-white"}
          style={{ position: "fixed", top: "0px", zIndex: 99 }}
        >
          <AppHeader />
        </div>
        <div
          className="body flex-grow-1 px-1"
          style={{ margin: "4rem 0rem", zIndex: 9 }}
        >
          <AppContents />
        </div>
        <div
          className={isMobile ? "w-100 bg-white" :"w-25 bg-white"}
          style={{ position: "fixed", bottom: "0px", zIndex: 99 }}
        >
          <AppFooter />
        </div>
      </div>
    );
  };
  return (
    <div className="d-flex justify-content-center" style={{backgroundColor:"#b8dcd6"}}>
      <div className={isMobile ? "w-100" : "w-25"}>{singleLayoutUI()}</div>
    </div>
  );
};

export default DefaultLayout;
