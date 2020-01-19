import axios from 'axios';

import API_URL from '../constants';

const SEMESTERS_URL = `${API_URL}/semesters`;

export default {
  index() {
    return axios.get(SEMESTERS_URL);
  },
  create(semesterData) {
    return axios.post(SEMESTERS_URL, semesterData);
  },
  show(semesterId) {
    return axios.get(`${SEMESTERS_URL}/${semesterId}`);
  },
  update(semesterId, semesterData) {
    return axios.patch(`${SEMESTERS_URL}/${semesterId}`, semesterData);
  },
  delete(semesterId) {
    return axios.delete(`${SEMESTERS_URL}/${semesterId}`);
  },
  groupByYear(semesters) {
    const orderedSemesters = {};
    semesters.forEach((semester) => {
      if (!orderedSemesters[semester.year]) {
        orderedSemesters[semester.year] = [];
      }
      orderedSemesters[semester.year].push(semester);
    });
    return orderedSemesters;
  },
};
