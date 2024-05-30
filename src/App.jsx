import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import GradeList from "./components/grades/GradeList";
import CreateGrade from "./components/grades/CreateGrade";
import GradeDetails from "./components/grades/GradeDetails";
import EditGrade from "./components/grades/EditGrade";

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
              <Route exact path="/grades" component={GradeList} />
              <Route path="/grades/create" component={CreateGrade} />
              <Route path="/grades/:id" component={GradeDetails} />
              <Route path="/grades/:id/edit" component={EditGrade} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
