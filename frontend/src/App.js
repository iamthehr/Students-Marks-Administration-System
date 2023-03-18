import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Topbar from "./components/Topbar";
import { Dashboard } from "./Pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import AddStudent from "./Pages/AddStudent";
import AddSubject from "./Pages/AddSubject";
import { Addmarks } from "./Pages/Addmarks";
import Authpage from "./Pages/Authpage";

function App() {
  return (
    <div className="App">
      {/* <Topbar /> */}
      <Routes>
        <Route path="/" element={<Authpage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Add-Students" element={<AddStudent />} />
        <Route path="/Add-Subject" element={<AddSubject />} />
        <Route path="/Add-Marks" element={<Addmarks />} />
      </Routes>
    </div>
  );
}

export default App;
