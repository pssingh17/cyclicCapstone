import React from "react";

export const MyReviewsBox = () => {
  return (
    <div className="py-3 px-2">
      <div className="myContainer ">
        <div className="customHeader py-3 px-5">
          <div style={{fontSize:"15px",fontWeight:"Bold"}}>My Reviews</div>
          <div><a href="#">View All</a></div>
        </div>
        <div className="customBody">
          <div className="customItems">
            <div>Pending</div>
            <div className="badge bg-primary">0</div>
          </div>
          <div className="customItems">
            <div>Validation Failed</div>
            <div className="badge bg-primary">0</div>
          </div>
          <div className="customItems">
            <div>Declined</div>
            <div className="badge bg-primary">0</div>
          </div>
          <div className="customItems">
            <div>Sent to Reviewer</div>
            <div className="badge bg-primary">0</div>
          </div>
          <div className="customItems">
            <div>Submitted/Waiting Validation</div>
            <div className="badge bg-primary">0</div>
          </div>
          <div className="customItems">
            <div>Submitted/Pending Validation</div>
            <div className="badge bg-primary">0</div>
          </div>
          <div className="customItems">
            <div>Approved</div>
            <div className="badge bg-primary">0</div>
          </div>
          <div className="customItems pb-4">
            <div>Rejected</div>
            <div className="badge bg-primary">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
