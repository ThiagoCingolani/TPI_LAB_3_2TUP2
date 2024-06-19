import Header from "../navBar/NavBar";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.object,
};
export default MainLayout;