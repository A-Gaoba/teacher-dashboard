import React, { useState, useEffect } from "react";
import Courses from "./Courses";

const TeacherProfile = ({ teacherId }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/teachers/${teacherId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch teacher data");
        }
        const data = await response.json();
        setTeacher(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [teacherId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!teacher) {
    return <div className="text-center">Error: Teacher data not found</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-8">
        <div className="flex justify-center mb-6">
          <img
            src={teacher.image}
            alt="Teacher Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
        </div>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            {teacher.firstName}{" "}
            {teacher.middleName && teacher.middleName[0] + "."}{" "}
            {teacher.lastName}
          </h2>
          <p className="text-gray-600">{teacher.email}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700 font-semibold">Phone</p>
            <p className="text-gray-600">{teacher.phone || "Not available"}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Gender</p>
            <p className="text-gray-600">{teacher.gender || "Not available"}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Date of Birth</p>
            <p className="text-gray-600">
              {teacher.dateOfBirth || "Not available"}
            </p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Subjects Taught</p>
            <ul className="text-gray-600">
              {teacher.subjects &&
                teacher.subjects.map((subject) => (
                  <li key={subject.id}>{subject.name}</li>
                ))}
            </ul>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Classes</p>
            <ul className="text-gray-600">
              {teacher.classes &&
                teacher.classes.map((classItem) => (
                  <li key={classItem.id}>{classItem.description}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <Courses />
      </div>
    </div>
  );
};

export default TeacherProfile;
