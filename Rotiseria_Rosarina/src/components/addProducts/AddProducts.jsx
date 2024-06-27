import { useReducer } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const initialProductForm = {
    id: 0,
    name: "",
    price: 0,
    category: "",
    ingredients: [],
    imageUrl: "",
    formValid: false,
}

const productFormReducer = (state, action) => {
    switch (action.type) {
        case "NAME_UPDATED":
            return {
                ...state,
                name: action.value,
                formValid:
                    action.value && state.price && state.category && state.ingredients,
            };

        case "PRICE_UPDATED":
            return {
                ...state,
                price: action.value,
                formValid:
                    action.value && state.name && state.category && state.ingredients,
            };
        case "CATEGORY_UPDATED":
            return {
                ...state,
                category: action.value,
                formValid:
                    action.value && state.name && state.price && state.ingredients,
            };
        case "INGREDIENTS_UPDATED":
            return {
                ...state,
                ingredients: action.value,
                formValid: action.value.length && state.name && state.price && state.category,
            };
        case "IMAGEURL_UPDATED":
            return {
                ...state,
                imageUrl: action.value,
                formValid: state.name && state.price && state.ingredients && state.category,
            };
        case "RESET_FORM":
            return {
                ...initialProductForm,
                formValid: false,
            };
        default:
            return state;
    }
};

const AddProducts = ({ onProductDataSaved, foods, toggleAddProduct }) => {
    const [productForm, dispatch] = useReducer(productFormReducer, initialProductForm);

    const changeNameHandler = (event) => {
        dispatch({
            type: "NAME_UPDATED",
            value: event.target.value,
        });
    };

    const changePriceHandler = (event) => {
        dispatch({
            type: "PRICE_UPDATED",
            value: event.target.value,
        });
    };

    const changeCategoryHandler = (event) => {
        dispatch({
            type: "CATEGORY_UPDATED",
            value: event.target.value,
        });
    };

    const changeIngredientsHandler = (event) => {
        const ingredientsArray = event.target.value.split(",").map(ingredient => ingredient.trim());
        dispatch({
            type: "INGREDIENTS_UPDATED",
            value: ingredientsArray,
        });
    };

    const changeImageUrlHandler = (event) => {
        dispatch({
            type: "IMAGEURL_UPDATED",
            value: event.target.value,
        });
    };

    const submitProductHandler = (event) => {
        event.preventDefault();
        const productDto = {
            id: foods.length + 1,
            name: productForm.name,
            price: productForm.price,
            category: productForm.category,
            ingredients: productForm.ingredients,
            imageUrl: productForm.imageUrl,
        };
        onProductDataSaved(productDto);
        dispatch({
            type: "RESET_FORM",
        });
    };
    return (
        <div className="cart-overlay overflow-auto">
            <div className="cart">
                <Row>
                    <Col>
                        <Card bg="success" style={{width:"800px", height:"335px"}}>
                            <Card.Body>
                                <Form className="text-white" onSubmit={submitProductHandler}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Nombre del Producto</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    required
                                                    placeholder="Ingresar el nombre"
                                                    onChange={changeNameHandler}
                                                    value={productForm.name}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Precio</Form.Label>
                                                <Form.Control
                                                    onChange={changePriceHandler}
                                                    type="number"
                                                    placeholder="Ingresar el precio"
                                                    value={productForm.price}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Categoria</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={changeCategoryHandler}
                                                    placeholder="Ingresar la categoria del producto"
                                                    value={productForm.category}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Ingredientes</Form.Label>
                                                <Form.Control
                                                    onChange={changeIngredientsHandler}
                                                    type="text"
                                                    placeholder="Ingresar los ingredientes"
                                                    value={productForm.ingredients}
                                                    min={1}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-between">
                                        <Form.Group className="mb-3">
                                            <Form.Label>URL de imagen</Form.Label>
                                            <Form.Control
                                                onChange={changeImageUrlHandler}
                                                value={productForm.imageUrl}
                                                type="text"
                                                placeholder="Ingresar url de imagen"
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col md={3} className="d-flex justify-content-center">
                                            <Button
                                                disabled={!productForm.formValid}
                                                variant="primary"
                                                type="submit"
                                            >
                                                Agregar producto
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Button className="mt-4" variant="danger" onClick={toggleAddProduct}>Cerrar</Button>
            </div>
        </div>
            
    )
}

AddProducts.propTypes = {
    onProductDataSaved: PropTypes.func,
    foods: PropTypes.array,
};

export default AddProducts