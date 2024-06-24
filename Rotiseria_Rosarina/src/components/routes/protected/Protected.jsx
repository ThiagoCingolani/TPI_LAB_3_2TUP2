import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../../services/authentication/Authentication.context";
import PropTypes from "prop-types";

const Protected = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthenticationContext);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

Protected.propTypes = {
  children: PropTypes.object.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Protected;
