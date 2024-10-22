import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaLaptop,
  FaLaptopCode,
  FaDatabase,
  FaCode,
  FaCog,
} from "react-icons/fa";

const AppFooter = () => {
  const navigate = useNavigate();
  // const currentPath = window.location.pathname.split("/");
  const currentPath = window.location.hash.split('/')[1];
  const activeCurrentPathVal =
    currentPath === "home"
      ? 0
      : currentPath === "front-ent"
      ? 1
      : currentPath === "back-end"
      ? 2
      : currentPath === "database"
      ? 3
      : currentPath === "other"
      ? 4
      : currentPath === "settings"
      ? 5
      : "";

  // const [activeFooterItem, setActiveFooterItem] = useState(0);
  // console.log('activeCurrentPathVal', currentPath, activeCurrentPathVal)

  return (
    <div className="d-flex justify-content-between px-3 py-2 shadow">
      {/* <div className={activeCurrentPathVal  === 0 ? "active-footer-item" : "footer-item"} onClick={() => navigate("/home")}>
        <h3 className="m-0">
          <FaHome />
        </h3>
        <span className="footer-icon-text">Home</span>
      </div> */}
      <div
        className={activeCurrentPathVal  === 1 ? "active-footer-item" : "footer-item"}
        onClick={() => navigate("/front-ent")}
      >
        <h3 className="m-0">
          <FaLaptop />
        </h3>
        <span className="footer-icon-text">Frontend</span>
      </div>
      <div
        className={activeCurrentPathVal  === 2 ? "active-footer-item" : "footer-item"}
        onClick={() => navigate("/back-end")}
      >
        <h3 className="m-0">
          <FaLaptopCode />
        </h3>
        <span className="footer-icon-text">Backend</span>
      </div>
      <div
        className={activeCurrentPathVal  === 3 ? "active-footer-item" : "footer-item"}
        onClick={() => navigate("/database")}
      >
        <h3 className="m-0">
          <FaDatabase />
        </h3>
        <span className="footer-icon-text">Database</span>
      </div>
      <div
        className={activeCurrentPathVal  === 4 ? "active-footer-item" : "footer-item"}
        onClick={() => navigate("/other")}
      >
        <h3 className="m-0">
          <FaCode />
        </h3>
        <span className="footer-icon-text">Other</span>
      </div>
      <div
        className={activeCurrentPathVal  === 5 ? "active-footer-item" : "footer-item"}
        onClick={() => navigate("/settings")}
      >
        <h3 className="m-0">
          <FaCog />
        </h3>
        <span className="footer-icon-text">Settings</span>
      </div>
    </div>
  );
};

export default AppFooter;
