import axios from "axios";

const REACT_APP_API_URL = "http://localhost:3001";

export const getGrades = async () => {
  return axios.get(`${REACT_APP_API_URL}/grades`);
};

export const getGradeById = async (id) => {
  return axios.get(`${REACT_APP_API_URL}/grades/${id}`);
};

export const createGrade = async (grade) => {
  return axios.post(`${REACT_APP_API_URL}/grades`, grade);
};

export const updateGrade = async (id, grade) => {
  return axios.put(`${REACT_APP_API_URL}/grades/${id}`, grade);
};

export const deleteGrade = async (id) => {
  return axios.delete(`${REACT_APP_API_URL}/grades/${id}`);
};
