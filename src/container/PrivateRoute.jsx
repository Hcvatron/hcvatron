import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { isUserLoggedIn } = useUserContext();

  return isUserLoggedIn ? children : <Navigate to="/user/login" />;
};

export default PrivateRoute;
