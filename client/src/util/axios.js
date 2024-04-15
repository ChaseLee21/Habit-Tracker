import axios from "axios";

async function putAnalytic(analytic) {
  try {
    const request = await axios.put('/api/analytics/' + analytic._id, analytic);
    return request.data;
  } catch (err) {
    console.log(err);
  }
}

//TODO: find out why i return request instead of request.data
async function getUser(userId) {
  try {
    const request = await axios.get('/api/users/' + userId);
    return request;
  } catch (err) {
    console.log(err);
  }
}

export {putAnalytic, getUser};