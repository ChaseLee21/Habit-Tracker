import { validateEmail, validateLoginPassword } from "../util/validate-helpers";
import { login } from "../util/axios";

function Login() {

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (validateForm(email, password)) {
      const userData = { email: email, password: password };
      //TODO: Implement login function
      const user = await login(userData);
      console.log("User LoggedIn: ", user);
      window.location.href = "/";
    }
  }

  function validateForm(email, password) {
    if (!validateEmail(email)) {
      alert("Invalid email");
      console.log("Invalid email");
      return false;
    }
    if (!validateLoginPassword(password)) {
      alert("Invalid password");
      console.log("Invalid password");
      return false;
    }
    return true;
  }
  
  return (
    <>
      <h2 className="flex rounded-md m-2 bg-secondaryBg text-secondaryText p-2 text-xl shadow-xl">Register</h2>
      <form className="flex flex-col m-2 p-2 bg-secondaryBg rounded-md shadow-xl" onSubmit={handleLoginSubmit}>
        <label htmlFor="email" className="text-secondaryText">Email:</label>
        <input type="email" id="email" name="email" className="p-1 m-1 rounded-md" />
        <label htmlFor="password" className="text-secondaryText">Password:</label>
        <input type="password" id="password" name="password" className="p-1 m-1 rounded-md" />
        <button type="submit" className="bg-primaryBg text-primaryText w-fit p-2 rounded-md m-1">Register</button>
      </form>
    </>
  )
}
  
  export default Login
  