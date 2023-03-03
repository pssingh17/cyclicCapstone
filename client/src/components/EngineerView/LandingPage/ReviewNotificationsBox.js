import React from "react";

export const ReviewNotificationsBox = () => {
  return (
    <div className="py-3 px-2">
      <div className="myContainer">
        <div className="customHeader py-3 px-5">
          <div style={{ fontSize: "15px", fontWeight: "Bold" }}>
            Review Notifcations
          </div>
          <div>
            <a href="#">View All</a>
          </div>
        </div>
        <div className="customBody">
          <div className="customTable px-4">
          {/* <table className="table">
            <thead style={{backgroundColor:"#ABC7DE"}}>
              <tr>
                <th scope="col">Report</th>
                <th scope="col">Type</th>
                <th scope="col">Project Number</th>
                <th scope="col">Project Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Report 01</th>
                <td>Test Report</td>
                <td>12345</td>
                <td>Project 1</td>
              </tr>
              <tr>
                <th scope="row">Report 02</th>
                <td>Test Report</td>
                <td>12345</td>
                <td>Project 2</td>
              </tr>
              <tr>
                <th scope="row">Report 03</th>
                <td >Test Report</td>
                <td>12345</td>
                <td>Project 3</td>
              </tr>
            </tbody>
          </table> */}
          </div>
        </div>
      </div>
    </div>
  );
};
