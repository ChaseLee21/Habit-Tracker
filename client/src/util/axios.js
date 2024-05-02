import axios from "axios";

async function putAnalytic(analytic) {
  try {
    const request = await axios.put('/api/analytics/' + analytic._id, analytic);
    return request.data;
  } catch (err) {
    console.log(err);
  }
}

async function getUser(userId) {
  try {
    const request = await axios.get('/api/users/' + userId);
    return request.data;
  } catch (err) {
    console.log(err);
  }
}

async function putUser(user) {
  try {
    const request = await axios.put('/api/users/' + user._id, user);
    return request.data;
  } catch (err) {
    console.log(err);
  }
}

async function postUser(userData) {
  try {
    const request = await axios.post('/api/users', userData);
    return request.data;
  } catch (err) {
    console.log(err);
  }
}

async function checkToken() {
  try {
    const request = await axios.get('/api/checkToken', { withCredentials: true });
    return request.data;
  } catch (err) {
    console.log(err);
  }
}

async function login(userData) {
  try {
    const request = await axios.post('/api/login', userData);
    return request.data;
  } catch (err) {
    console.log(err);
  }
}

export {putAnalytic, getUser, putUser, postUser, checkToken, login};