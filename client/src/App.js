
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./components/Common/Header/Header";
import { Navbar } from "./components/Common/Navbar/Navbar";

import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Footer } from "./components/Common/Footer/Footer";
import { ComplianceCentralUsers } from "./components/ComplianceCentralUsers/ComplianceCentralUsers";
import { LandingPage } from "./components/EngineerView/LandingPage/LandingPage";
import CreateProjectFolder from "./components/EngineerView/AssignedProjects/CreateProjectFolder";
import Reviewreports from "./components/ReviewerView/Reviewreports/Reviewreports";
import { NewReport } from "./components//EngineerView/AssignedProjects/Reports/NewReport";

import { AssignedProjectMain } from "./components/EngineerView/AssignedProjects/AssignedProjectMain";
import { Deliverables } from "./components/EngineerView/AssignedProjects/Deliverables/Deliverables";
import {Details } from "./components/EngineerView/AssignedProjects/Details/Details";
import {Financials } from "./components/EngineerView/AssignedProjects/Financials/Financials";
import {SupportingDocuments } from "./components/EngineerView/AssignedProjects/SupportingDocuments/SupportingDocuments";
import {Correspondence } from "./components/EngineerView/AssignedProjects/Correspondence/Correspondence";
import {EquipmentLog } from "./components/EngineerView/AssignedProjects/EquipmentLog/EquipmentLog";
import {Sample } from "./components/EngineerView/AssignedProjects/Sample/Sample";
import Reviewworks from "./components/ReviewerView/Reviewreports/Reviewworks";
import ViewReportsScreen from "./components/EngineerView/ReviewReport/ViewReportsScreen";



function App(

) {
  
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Engineer routes */}


        <Route path="engineerView/landingPage" element={<LandingPage />} />
        <Route path="/complianceCentralUsers" element={<ComplianceCentralUsers />} />
        <Route path="engineerView/createProjectFolder" element={<CreateProjectFolder />} />

        {/* Nested Routes */}
        <Route path="engineerView/assignedProjects" element={<AssignedProjectMain />}>
          <Route index element={<Deliverables />} />
        <Route  path="details" element={<Details />}/>
        <Route  path="financials" element={<Financials />}/>
        <Route  path="deliverables" element={<Deliverables />}/>
        
        <Route  path="supportingDocuments" element={<SupportingDocuments />}/>
        <Route  path="correspondence" element={<Correspondence />}/>
        <Route  path="correspondence" element={<Correspondence />}/>
        <Route  path="equipmentLog" element={<EquipmentLog />}/>
        <Route  path="sample" element={<Sample />}/>
        </Route>
        <Route path="engineerView/assignedProjects/newReport" element={<NewReport />} />
        <Route path="engineerView/reviewReport" element={<ViewReportsScreen />} />


        {/* Reviewer Eroutes */}
        <Route path="reviewerView/reviewReports" element={<Reviewreports />} />
        <Route path="reviewerView/reviewWorks" element={<Reviewworks />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
