import React, { useState, useEffect } from "react";

const CourseForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    videoLink: "",
    subjectId: "",
    semesterId: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchSubjectsAndSemesters = async () => {
      try {
        const subjectsResponse = await fetch("http://localhost:3001/subjects");
        const semestersResponse = await fetch(
          "http://localhost:3001/semesters"
        );

        if (!subjectsResponse.ok || !semestersResponse.ok) {
          throw new Error("Failed to fetch subjects or semesters");
        }

        const subjectsData = await subjectsResponse.json();
        const semestersData = await semestersResponse.json();

        setSubjects(subjectsData);
        setSemesters(semestersData);
      } catch (error) {
        console.error("Error fetching subjects or semesters:", error);
      }
    };

    fetchSubjectsAndSemesters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate form data
      if (
        !formData.name ||
        !formData.description ||
        !formData.videoLink ||
        !formData.subjectId ||
        !formData.semesterId
      ) {
        throw new Error("All fields are required.");
      }

      const response = await fetch("http://localhost:3001/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create course");
      }

      closeModal(); // Close the modal after creating the course
      setMessage("Course created successfully.");
      // Optionally, you can refresh the course list or perform any other action
    } catch (error) {
      console.error("Error creating course:", error);
      setMessage(
        error.message || "Failed to create course. Please try again later."
      );
    }
  };

  return (
    <div className=" md:w-96">
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      {message && (
        <div
          className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
            rows="3"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="videoLink"
          >
            Video Link
          </label>
          <input
            type="text"
            id="videoLink"
            name="videoLink"
            value={formData.videoLink}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter video link"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="subjectId"
          >
            Subject
          </label>
          <select
            id="subjectId"
            name="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="semesterId"
          >
            Semester
          </label>
          <select
            id="semesterId"
            name="semesterId"
            value={formData.semesterId}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Semester</option>
            {semesters.map((semester) => (
              <option key={semester.id} value={semester.id}>
                {semester.term} - {semester.year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
