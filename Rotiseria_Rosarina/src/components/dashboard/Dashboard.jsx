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
  const [showAddProduct, setShowAddProduct] = useState(false);
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
  }, [foods]);

  const updateProductHandler = (updatedProductData) => {
    const updatedFoods = foods.map((food) =>
      food.id === updatedProductData.id ? updatedProductData : food
    );
    setFoods(updatedFoods);
  };

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
      id: String(foods.length + 1),
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
      setFoods((prevFoods) => [...prevFoods, data]);
    } catch (error) {
      alert(error);
    }
  };

  const toggleAddProduct = () => {
    setShowAddProduct(!showAddProduct);
  }

  return (
    <div className="d-grid text-center">
      <MainLayout />
      {user && user.role === "Admin" &&
      <div>
          <Button 
            variant="success"
            onClick={toggleAddProduct}
            style={{ height: "50px", width: "250px" }}>
            Agregar Producto
          </Button>
      </div>}
      {showAddProduct &&
        <AddProducts toggleAddProduct={toggleAddProduct} foods={foods} onProductDataSaved={saveProductDataHandler} />
      }
      <ProductSearch onSearch={searchHandler} />
      <Products foods={foods} onUpdate={updateProductHandler}/>
    </div>
  );
};

export default Dashboard;
