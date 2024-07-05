import React, { useEffect, useContext, useState } from "react";
import ProductSearch from "../productSearch/ProductSearch";
import AddProducts from "../addProducts/AddProducts";
import Products from "../products/Products";
import MainLayout from "../layout/MainLayout";
import Users from "../manageUsers/Users";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { Button } from "react-bootstrap";
import useModal from "../hooks/useModal";

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const [originalFoods, setOriginalFoods] = useState([]);
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const { user } = useContext(AuthenticationContext);
  const { isOpen, openModal, closeModal, } = useModal()

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

  useEffect(() => {
    fetch("http://localhost:3001/Users", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Usuario no encontrado");
        }
        return response.json();
      })
      .then((usersData) => {
        setUsers(usersData);
        setOriginalUsers(usersData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },[]);


  const updateUsersHandler = (updatedUsersData) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUsersData.id ? updatedProductData : user
    );
    setUsers(updatedUsers);
  };


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

  const searchUserHandler = (searchUser) => {
    const filteredUsers = originalUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.role.toLowerCase().includes(searchUser.toLowerCase())
    );
    setUsers(filteredUsers);
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
      {user && user.role === "Sysadmin" &&
        <div>
          <Button
            onClick={openModal}
            variant="success"
            style={{ height: "50px", width: "250px" }}>
            Administrar usuarios
          </Button>
        </div>
      }
      {isOpen && <Users users={users} searchUserHandler={searchUserHandler} closeModal={closeModal} onUpdateUsers={updateUsersHandler}/>}
      <ProductSearch onSearch={searchHandler} />
      <Products foods={foods} onUpdate={updateProductHandler} />
    </div>
  );
};

export default Dashboard;
