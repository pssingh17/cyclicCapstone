import logo from "./logo.svg";
import "./App.css";
import { Form } from "./components/Form";
import { Header } from "./components/Common/Header/Header";
import { Navbar } from "./components/Common/Navbar/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Footer } from "./components/Common/Footer/Footer";
import { ComplianceCentralUsers } from "./components/ComplianceCentralUsers/ComplianceCentralUsers";
import { LandingPage } from "./components/EngineerView/LandingPage/LandingPage";
import CreateProjectFolder from "./components/EngineerView/AssignedProjects/CreateProjectFolder";
import Reviewreports from "./components/ReviewerView/Reviewreports/Reviewreports";
import { NewReport } from "./components//EngineerView/AssignedProjects/Reports/NewReport";
import { ReportsMainTab } from "./components/EngineerView/AssignedProjects/Reports/ReportsMainTab";
import { AssignedProjectMain } from "./components/EngineerView/AssignedProjects/AssignedProjectMain";
function App() {
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
        <Route path="engineerView/assignedProjects" element={<AssignedProjectMain />} />
        <Route path="engineerView/newReport" element={<NewReport />} />
        {/* Reviewer Eroutes */}
        <Route path="reviewerView/reviewReports" element={<Reviewreports />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
