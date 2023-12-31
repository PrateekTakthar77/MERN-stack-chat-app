import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { UserContext } from "./Usercontext";

const Register = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(true); // Track register/login mode
  const [errorMessage, setErrorMessage] = useState("");

  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function register(ev) {
    ev.preventDefault();

    if (isRegisterMode) {
      // Registration logic
      if (!username || !password) {
        setErrorMessage("Username and password are required.");
        return;
      }

      try {
        const { data } = await axios.post("/register", { username, password });
        setLoggedInUsername(username);
        setId(data.id);
        console.log("API Response:", data);
      } catch (error) {
        console.error("API Error:", error);
        setErrorMessage("An error occurred during registration.");
      }
    } else {
      try {
        const { data } = await axios.post("/login", { username, password });
        setLoggedInUsername(username);
        setId(data.id);
        console.log("API Response:", data);
      } catch (error) {
        console.error("API Error:", error);
        setErrorMessage("An error occurred during registration.");
      }
    }
  }

  const toggleMode = () => {
    // Toggle between register and login mode
    setIsRegisterMode(!isRegisterMode);
  };

  return (
    <div
      className={`bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 bg-cover min-h-screen flex items-center justify-center ${
        isHovered ? "animate-fade-in" : ""
      }`}
    >
      <form
        className="w-96 p-6 bg-white rounded-lg shadow-lg"
        onSubmit={register}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-purple-600">
          {isRegisterMode ? "Sign Up" : "Log In"}
        </h2>

        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Username
          </label>
          <input
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-400 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-purple-400 focus:outline-none pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className={`text-gray-400 hover:text-gray-700 ${
                  showPassword ? "opacity-100" : "opacity-70"
                }`}
              />
            </button>
          </div>
        </div>
        <button
          className={`bg-transparent hover:bg-purple-600 text-purple-600 hover:text-white transition duration-300 ease-in-out border-2 border-purple-600 rounded-full py-2 w-full transform hover:scale-105 ${
            isHovered ? "opacity-100" : "opacity-100"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isRegisterMode ? "Create Account" : "Log In"}
        </button>

        <p
          className="mt-4 text-gray-600 text-center cursor-pointer"
          onClick={toggleMode}
        >
          {isRegisterMode
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </p>
      </form>
    </div>
  );
};

export default Register;
