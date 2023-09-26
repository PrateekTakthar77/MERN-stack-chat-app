import { useContext } from "react";
import Register from "./Register";
import { UserContext } from "./Usercontext";
import Chat from "./Chat";

const Routes = () => {
  const { username, id } = useContext(UserContext);
  if (username) {
    return (
      <>
        <Chat />
      </>
    );
  }
  return (
    <>
      <Register />
    </>
  );
};

export default Routes;
