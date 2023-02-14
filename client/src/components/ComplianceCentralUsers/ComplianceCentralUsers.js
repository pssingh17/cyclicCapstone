import React from "react";
import { Header } from "../Common/Header/Header";
import { Navbar } from "../Common/Navbar/Navbar"
import "./ComplianceCentralUsers";
import { LoadMore } from "./LoadMore";
import { StatusContainer } from "./StatusContainer";
import { UserDetailsContainer } from "./UserDetailsContainer";

export const ComplianceCentralUsers = () => {
  return (
    <>
   
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
    </>
  );
};
