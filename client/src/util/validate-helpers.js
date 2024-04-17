function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validateUsername(username) {
  const re = /^[a-zA-Z0-9]{6,}$/;
  return re.test(username);
}

function validatePassword(password, confirmPassword) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (password !== confirmPassword) {
    return false;
  }
  return re.test(password);
}

export { validateEmail, validateUsername, validatePassword };