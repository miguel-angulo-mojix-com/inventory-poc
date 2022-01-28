import React, {useState} from "react";

const CalculatedSection = ({expected, missing, total, found, overs, extras, progress, timestamp = '', nowTs}) => {
  return (
    <div className="calculated-section">
      <p className="sub-title">Calculated section</p>
      <div>
        <div className="row">
          <div className="item">
            <p className="sub-title">Your Match</p>
            <p>{found}</p>
          </div>
          <div className="item">
            <p className="sub-title">All Matches</p>
            <p>{found}</p>
          </div>

        </div>
        <div className="row">
          <div className="item">
            <p className="sub-title">Remaining</p>
            <p>{missing}</p>
          </div>
          <div className="item">
            <p className="sub-title">expected</p>
            <p>{expected}</p>
          </div>

        </div>
        <div className="row">
          <div className="item">
            <p className="sub-title">Overs</p>
            <p>{overs}</p>
          </div>
        </div>
      </div>
      <div className="footer">
        {
          timestamp && <p className="sub-title">Data load in: {(nowTs-timestamp)/1000} Ms</p>
        }
      </div>
    </div>
  )
}
export default CalculatedSection;

