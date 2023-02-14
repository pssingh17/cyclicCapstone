import React from "react";
import "./LandingPage.css";
import { LoadMore } from "./LoadMore";
import { StatusContainer } from "./StatusContainer";
import { UserDetailsContainer } from "./UserDetailsContainer";

export const LandingPage = () => {
  return (
    <div className="container">
      <div className="userInfo">
        <div className="Users">Users</div>
        <div className="actions">
          <button className="exportBtn">Export</button>
          <button className="AddUserBtn">Add User</button>
        </div>
      </div>
      <StatusContainer />
      <UserDetailsContainer />
      <LoadMore />
      
    </div>
  );
};
