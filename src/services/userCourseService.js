import axios from 'axios';

import API_URL from '../constants';

const USER_COURSES_URL = `${API_URL}/user_courses`;

export default {
  index() {
    return axios.get(USER_COURSES_URL);
  },
  create(userCourseData) {
    return axios.post(USER_COURSES_URL, userCourseData);
  },
  show(userCourseId) {
    return axios.get(`${USER_COURSES_URL}/${userCourseId}`);
  },
  update(userCourseId, userCourseData) {
    return axios.patch(`${USER_COURSES_URL}/${userCourseId}`, userCourseData);
  },
  delete(userCourseId) {
    return axios.delete(`${USER_COURSES_URL}/${userCourseId}`);
  },
};
