import { useState } from "react";
import PropTypes from "prop-types";
import {Form, Button, Row, InputGroup} from "react-bootstrap"

const ProductSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSearch()
        }
    };

    return (
        <>
            <Row className="justify-content-center w-100">
                <Form className="w-50">
                    <Form.Group controlId="formBasicSearch">
                        <InputGroup className="mb-3 mt-4">
                            <Form.Control
                                className="border-success"
                                type="text"
                                placeholder="Busca tu comida"
                                style={{ textAlign: 'center' }}
                                value={searchTerm}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="success" onClick={handleSearch}>
                                Buscar
                            </Button>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Row>
        </>
    );
};

ProductSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default ProductSearch;
