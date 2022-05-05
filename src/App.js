import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



// Components 

import Nav from "./components/Nav/Nav";

// pages
// import HomePage from "./pages/HomePage/HomePage";
// import ProjectPage from "./pages/ProjectPage/ProjectPage";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import PledgePage from "./pages/PledgePage/PledgePage";

import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PledgePage from "./pages/PledgePage/PledgePage";
import ProjectFormPage from "./pages/ProjectFormPage/ProjectFormPage";

//Styles
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Nav />

        <Routes>
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/pledges/:id" element={<PledgePage />} /> */}

          <Route path="/projects/create" element={<ProjectFormPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/pledges/:id" element={<PledgePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// {/* 
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// } */}

// export default App;
