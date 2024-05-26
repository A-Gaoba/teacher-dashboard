import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdOutlinePerson,
  MdChat,
  MdOutlineSubject,
  MdSupervisedUserCircle,
  MdAssessment,
  MdLogout,
} from "react-icons/md";

const App = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", icon: MdDashboard, path: "/" },
    { title: "Profile", icon: MdOutlinePerson, path: "/profile" },
    { title: "Courses", icon: MdOutlineSubject, gap: true, path: "/courses" },
    { title: "Questions", icon: MdChat, path: "/questions" },
    { title: "Students", icon: MdSupervisedUserCircle, path: "/students" },
    { title: "Reports", icon: MdAssessment, path: "/reports" },
    { title: "Log Out", icon: MdLogout, gap: true, path: "/" },
  ];

  return (
    <div className="flex min-h-full bg-dark-purple">
      <div
        className={`${
          open ? "w-full md:w-72" : "w-20"
        } bg-dark-purple p-5 pt-8 relative duration-300 min-h-screen`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 z-50 top-9 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center mb-8">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Teacher
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-3 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${
                Menu.gap ? "mt-4 md:mt-9" : "mt-2"
              } ${index === 0 && "bg-light-white"} `}
            >
              <Link to={Menu.path} className="flex items-center w-full">
                <Menu.icon size={24} />
                <span
                  className={`ml-2 ${
                    !open && "hidden"
                  } origin-left duration-200 text-lg`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
