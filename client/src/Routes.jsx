import { useContext } from "react";
import Register from "./Register";
import { UserContext } from "./Usercontext";

const Routes = () => {
  const { username, id } = useContext(UserContext);
  if (username) {
    return "looged in";
  }
  return (
    <>
      <Register />
    </>
  );
};

export default Routes;
