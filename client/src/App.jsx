import { useContext } from "react";
import Register from "./Register";
import axios from "axios";
import { UserContext, UserContextProvider } from "./Usercontext";
import Routes from "./Routes";

function App() {
  axios.defaults.baseURL = "http://localhost:3030";
  axios.defaults.withCredentials = true;
  const { username } = useContext(UserContext);
  console.log(username);
  return (
    <>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </>
  );
}

export default App;

// 53:15
