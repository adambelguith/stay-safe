import React from "react";
import Nord from "../../components/Classify/Nord";
import Statestic from "../../components/Classify/Statestic";
import Video from "../../components/Classify/Video";
import './css/Classify.css';
function Classify() {
  return (
    <>
    <center>
      <div className="Classify-container">
        <div className="top"> 
          <div className="video-container">
            <Video/>
          </div>
          <div className="nord-lable">
            <Nord/>
          </div>
        </div>
        <div className="Statestic">
          <Statestic/>
        </div>
      </div>
    </center>
    </>
  );
}

export default Classify;
