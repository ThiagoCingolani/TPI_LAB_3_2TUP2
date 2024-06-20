import Header from "../navBar/NavBar";
import PropTypes from "prop-types";
import "./MainLayout.css"

const MainLayout = ({ children }) => {
  return (
    <div id="layout">
      <Header />
      <div className="content">
        {children}
      </div>
    </div>

  );
};

MainLayout.propTypes = {
  children: PropTypes.object,
};
export default MainLayout;