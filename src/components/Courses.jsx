import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddCourse from "./AddCourse";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3001/courses");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Courses</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={openModal}
      >
        Create New Course
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 max-w-md">
            <AddCourse closeModal={closeModal} />
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link to={`/courses/${course.id}`} key={course.id}>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{course.name}</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <p className="text-gray-700 mb-2">
                    Subject: {course.subject.name}
                  </p>
                  <p className="text-gray-700 mb-2">
                    Semester: {course.semester.term} - {course.semester.year}
                  </p>
                  <a
                    href={course.videoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Watch Video
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
