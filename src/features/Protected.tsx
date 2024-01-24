import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

const Protected = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token || localStorage.getItem("accessToken"));

  if (token) {
    return <>{children}</>;
  }

  return <Navigate to="/auth/signin" />
};

export default Protected;