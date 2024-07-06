import { useState } from 'react';

const useModal = () => {
    const [isOpenUsers, setIsOpenUsers] = useState(false);
    const [isOpenCreateUser, setIsOpenCreateUser] = useState(false);
    const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(false);
    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
    const [isOpenUpdateProduct, setIsOpenUpdateProduct] = useState(false);
    const [isOpenCart, setIsOpenCart] = useState(false);


    const toggleUsers = () => setIsOpenUsers(!isOpenUsers);
    const toggleCreateUser = () => {setIsOpenCreateUser(!isOpenCreateUser); console.log(isOpenCreateUser)};
    const toggleUpdateUser = () => setIsOpenUpdateUser(!isOpenUpdateUser);
    const toggleAddProduct = () => setIsOpenAddProduct(!isOpenAddProduct);
    const toggleUpdateProduct = () => setIsOpenUpdateProduct(!isOpenUpdateProduct);
    const toggleCart = () => setIsOpenCart(!isOpenCart);

    return {
      isOpenCart,
      isOpenUpdateProduct,
      isOpenAddProduct,
      isOpenUpdateUser,
      isOpenCreateUser,
      isOpenUsers,
      toggleUsers,
      toggleCreateUser,
      toggleUpdateUser,
      toggleAddProduct,
      toggleUpdateProduct,
      toggleCart,
    };
};

export default useModal;
