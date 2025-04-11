import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { isUserLoggedIn } = useUserContext();

  return isUserLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
