import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Courses from "./components/Courses";
import Questions from "./components/Questions";
import Students from "./components/Students";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import ParentComponent from "./components/ParentComponent";
import CourseDetail from "./components/CourseDetail";
import './index.css'; // Make sure Tailwind CSS is included

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar open={openSidebarToggle} />
        <div className="flex flex-col flex-1">
          <Header openSidebar={openSidebar} />
          <div className="p-4 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile teacherId={13} />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/questions" element={<ParentComponent />} />
              <Route path="/students" element={<Students />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
