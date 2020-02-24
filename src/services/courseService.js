import axios from 'axios';

import API_URL from '../constants';

const COURSES_URL = `${API_URL}/courses`;

export default {
  index(instituteId) {
    return axios.get(COURSES_URL, instituteId);
  },
  create(courseData) {
    return axios.post(COURSES_URL, courseData);
  },
  show(courseId) {
    return axios.get(`${COURSES_URL}/${courseId}`);
  },
  update(courseId, courseData) {
    return axios.patch(`${COURSES_URL}/${courseId}`, courseData);
  },
  delete(courseId) {
    return axios.delete(`${COURSES_URL}/${courseId}`);
  },
};
