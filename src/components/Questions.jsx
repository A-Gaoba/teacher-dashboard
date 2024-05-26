import React, { useState } from "react";

const QuestionForm = ({ closeModal, quizId }) => {
  const [formData, setFormData] = useState({
    text: "",
    correctAnswer: "",
    quizId: quizId, // Initialize with the quizId passed as prop
  });

  const [message, setMessage] = useState(null);

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
      if (!formData.text || !formData.correctAnswer || !formData.quizId) {
        throw new Error("All fields are required.");
      }

      const response = await fetch("http://localhost:3001/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create question");
      }

      closeModal(); // Close the modal after creating the question
      setMessage("Question created successfully.");
      // Optionally, you can refresh the question list or perform any other action
    } catch (error) {
      console.error("Error creating question:", error);
      setMessage(
        error.message || "Failed to create question. Please try again later."
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Question</h2>
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="text">
            Question Text
          </label>
          <input
            type="text"
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter question text"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="correctAnswer"
          >
            Correct Answer
          </label>
          <input
            type="text"
            id="correctAnswer"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter correct answer"
            required
          />
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

export default QuestionForm;
