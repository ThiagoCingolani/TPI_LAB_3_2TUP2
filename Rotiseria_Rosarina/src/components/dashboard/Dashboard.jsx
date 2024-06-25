import React, { useEffect, useContext, useState } from "react";
import ProductSearch from "../productSearch/ProductSearch";
import Products from "../products/Products";
import MainLayout from "../layout/MainLayout";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const [originalFoods, setOriginalFoods] = useState([]);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    fetch("http://localhost:3001/foods", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }
        return response.json();
      })
      .then((foodsData) => {
        setFoods(foodsData);
        setOriginalFoods(foodsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const searchHandler = (searchTerm) => {
    const filteredFoods = originalFoods.filter(
      (food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoods(filteredFoods);
  };

  return (
    <div className="d-grid text-center">
      <MainLayout />
      <ProductSearch onSearch={searchHandler} />
      <Products foods={foods} />
      {user.role === "Sysadmin" && <div>Contenido exclusivo para Sysadmin</div>}
      {user.role === "Admin" && <div>Contenido exclusivo para Admin</div> && <div>Contenido exclusivo para Admin</div>}
    </div>
  );
};

export default Dashboard;
