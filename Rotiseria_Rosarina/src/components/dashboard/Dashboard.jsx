import React, { useEffect, useContext, useState } from "react";
import ProductSearch from "../productSearch/ProductSearch";
import AddProducts from "../addProducts/AddProducts";
import Products from "../products/Products";
import MainLayout from "../layout/MainLayout";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { Button } from "react-bootstrap";

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

  const saveProductDataHandler = async (enteredProductData) => {
    const productDto = {
      id: foods.length + 1,
      name: enteredProductData.name,
      price: enteredProductData.price,
      category: enteredProductData.category,
      ingredients: enteredProductData.ingredients,
      imageUrl: enteredProductData.imageUrl,
    };


    try {
      const response = await fetch("http://localhost:3001/foods", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDto),
      });

      if (!response.ok) {
        throw new Error("Fallo al intentar agregar un producto.");
      }

      const data = await response.json();
      setFoods(...foods, data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="d-grid text-center">
      <MainLayout />
      <ProductSearch onSearch={searchHandler} />
      <AddProducts foods={foods} onProductDataSaved={saveProductDataHandler}/>
      {/* <Button variant="success" style={{width:"100px", height:"45px"}} >Agregar producto</Button> */}
      <Products foods={foods} />
      {user.role === "Sysadmin" && <div>Contenido exclusivo para Sysadmin</div>}
      {user.role === "Admin" && <div>Contenido exclusivo para Admin</div>}
    </div>
  );
};

export default Dashboard;
