import axios from "axios";

function putAnalytic(analytic) {
  return axios.put('/api/analytics/' + analytic._id, analytic);
}

function getUser(userId) {
  return axios.get('/api/users/' + userId);
}

export {putAnalytic, getUser};