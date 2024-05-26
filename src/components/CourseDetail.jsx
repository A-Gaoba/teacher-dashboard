import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3001/courses/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course");
        }
        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!course) {
    return <p>Course not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
      <p className="text-lg mb-4">{course.description}</p>
      <p className="text-gray-700 mb-2">Subject: {course.subject?.name}</p>
      <p className="text-gray-700 mb-2">
        Semester: {course.semester?.term} - {course.semester?.year}
      </p>
      {course.videoLink && (
        <a
          href={course.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Watch Video
        </a>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Teacher</h2>
      {course.teachers && course.teachers.length > 0 ? (
        course.teachers.map((teacher) => (
          <div key={teacher.id} className="mb-4">
            <p className="text-gray-700">
              {teacher.firstName} {teacher.middleName} {teacher.lastName}
            </p>
            <p className="text-gray-600">{teacher.email}</p>
            <p className="text-gray-600">{teacher.bio}</p>
          </div>
        ))
      ) : (
        <p>No teacher assigned to this course</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Students</h2>
      {course.enrollments && course.enrollments.length > 0 ? (
        course.enrollments.map((enrollment) => (
          <div key={enrollment.student.id} className="mb-4">
            <p className="text-gray-700">
              {enrollment.student.firstName} {enrollment.student.middleName}{" "}
              {enrollment.student.lastName}
            </p>
            <p className="text-gray-600">{enrollment.student.email}</p>
          </div>
        ))
      ) : (
        <p>No students enrolled in this course</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Quizzes</h2>
      {course.quizzes && course.quizzes.length > 0 ? (
        course.quizzes.map((quiz) => (
          <div key={quiz.id} className="mb-4">
            <p className="text-gray-700 font-semibold">{quiz.title}</p>
            <p className="text-gray-600">{quiz.description}</p>
            <p className="text-gray-600">Max Score: {quiz.maxScore}</p>
            <h3 className="text-xl font-bold mt-4">Questions</h3>
            {quiz.questions && quiz.questions.length > 0 ? (
              quiz.questions.map((question) => (
                <div key={question.id} className="ml-4 mb-2">
                  <p className="text-gray-700">{question.text}</p>
                  <p className="text-gray-600">
                    Answer: {question.correctAnswer}
                  </p>
                </div>
              ))
            ) : (
              <p>No questions available</p>
            )}
          </div>
        ))
      ) : (
        <p>No quizzes available for this course</p>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Homework</h2>
      {course.homeworks && course.homeworks.length > 0 ? (
        course.homeworks.map((homework) => (
          <div key={homework.id} className="mb-4">
            <p className="text-gray-700 font-semibold">{homework.title}</p>
            <p className="text-gray-600">{homework.description}</p>
            <p className="text-gray-600">
              Due Date: {new Date(homework.dueDate).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>No homework assigned for this course</p>
      )}
    </div>
  );
};

export default CourseDetail;
