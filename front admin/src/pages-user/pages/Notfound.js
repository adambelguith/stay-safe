import React from "react";
import { useNavigate } from "react-router-dom";
import './css/Notfound.css'

function Notfound() {

  const navigate = useNavigate();

  const homebutton = (e) => {
    e.preventDefault()
    navigate("/user")
  }
  return (
    <div className="notfound-form-container">
      <div className="notfound-cercle">
        404
      </div>
      <h1 className="notfound-errur">
        Page not found.
      </h1>
      <p className="notfound-button" onClick={homebutton} >
        Page Home
      </p>
    </div>
  );
}

export default Notfound;
