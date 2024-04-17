import { validateEmail, validatePassword, validateUsername } from "../util/validate-helpers";
import { createUser } from "../util/axios";

function Register() {

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (validateForm(email, username, password, confirmPassword)) {
      createUser(email, username, password);
    }
  }

  function validateForm(email, username, password, confirmPassword) {
    if (!validateEmail(email)) {
      alert("Invalid email");
      return false;
    }
    if (!validateUsername(username)) {
      alert("Invalid username");
      return false;
    }
    if (!validatePassword(password, confirmPassword)) {
      alert("Invalid password");
      return false;
    }
    return true;
  }
  
  return (
    <>
      <h2 className="flex rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">Register</h2>
      <form className="flex flex-col m-2 p-2 bg-secondaryBg rounded-md shadow-xl" onSubmit={() => handleRegisterSubmit()}>
        <label htmlFor="email" className="text-secondaryText">Email:</label>
        <input type="email" id="email" name="email" className="p-1 m-1 rounded-md" />
        <label htmlFor="username" className="text-secondaryText">Username:</label>
        <input type="text" id="username" name="username" className="p-1 m-1 rounded-md" />
        <label htmlFor="password" className="text-secondaryText">Password:</label>
        <input type="password" id="password" name="password" className="p-1 m-1 rounded-md" />
        <label htmlFor="confirm-password" className="text-secondaryText">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" className="p-1 m-1 rounded-md" />
        <button type="submit" className="bg-primaryBg text-primaryText w-fit p-2 rounded-md m-1">Register</button>
      </form>
    </>
  )
}
  
  export default Register
  