import React, { useState } from "react";
import QuestionForm from "./Questions"; 

const ParentComponent = ({ quizId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Question
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <QuestionForm closeModal={closeModal} quizId={quizId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
