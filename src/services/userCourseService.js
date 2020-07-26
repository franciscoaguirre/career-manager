import axios from 'axios';

import API_URL from '../constants';

const USER_COURSES_URL = `${API_URL}/user_courses`;

window.deleteUserCourse = function (userCourseId) {
  return axios.delete(`${USER_COURSES_URL}/${userCourseId}`);
};

export default {
  index(semesterId) {
    console.log(semesterId);
    return axios.get(USER_COURSES_URL, { params: { semester_id: semesterId } });
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
