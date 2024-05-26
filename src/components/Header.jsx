import React from "react";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChatAlt,
} from "react-icons/hi";

export default function Header() {
  const name = "Abdulrahman";
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div className="bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between sticky top-0">
      {/* input */}
      <div className="relative flex-shrink w-full md:w-[24rem]">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none border border-gray-300 w-full md:w-[24rem] h-10 pl-11 pr-4 rounded-sm"
        />
      </div>

      <div className="flex items-center gap-2 mr-2">
        {/* messages box */}
        <div className="relative">
          <button
            onClick={() => {}}
            className="group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
          >
            <HiOutlineChatAlt fontSize={24} />
          </button>
          <div className="absolute md:right-0 -right-20 z-10 mt-2.5 transform w-80 hidden">
            <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
              <strong className="text-gray-700 font-medium">Messages</strong>
              <div className="mt-2 py-1 text-sm">This is messages panel.</div>
            </div>
          </div>
        </div>
        {/* notifications box */}
        <div className="relative ">
          <button
            onClick={() => {}}
            className="group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
          >
            <HiOutlineBell fontSize={24} />
          </button>
          <div className="absolute right-0 z-10 mt-2.5 transform w-72 hidden">
            <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
              <strong className="text-gray-700 font-medium">
                Notifications
              </strong>
              <div className="mt-2 py-1 text-sm">
                This is notification panel.
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          {/* <span className="mr-4">{name}</span> */}
          <div className="rounded-full overflow-hidden">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center font-bold">
              {firstLetter}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
