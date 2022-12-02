import React from "react";
import { useNavigate } from "react-router-dom";

function Modal({ setOpenModal }) {
  const navigate = useNavigate();
  return (
    <div className="register">
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
              navigate("/signin")
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>
            Thank you sir for using our site
            but before accepting your application 
            we need some checking processes 
            please rejoin us after 24h 
            thanks for your understanding
          </h1>
        </div>
     </div>
      </div>
    </div>
  );
}

export default Modal;
