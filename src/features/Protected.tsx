import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

const Protected = ({ component }: any) => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token) {
    return <> {component} </>;
  }

  return (
    <>
      Not authorised
      <Navigate to="/auth/signin" />
    </>
  );
};

export default Protected;