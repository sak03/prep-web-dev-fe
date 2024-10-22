import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div 
    className='d-flex justify-content-between px-3 py-2 shadow'
    style={{backgroundColor:"#008069", color:"#fff"}}
    >
      <div><h3>Prep Web Dev</h3></div>
      <div><h3 onClick={()=> navigate(`${token ? "/profile" : "/login"}`)} className='pointer'><FaUserCircle /></h3></div>
    </div>
  )
}

export default AppHeader