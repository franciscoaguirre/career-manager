export default process.env.NODE_ENV === 'production'
  ? 'https://career-manager-api.herokuapp.com/api/v1'
  : 'http://localhost:3000/api/v1';
