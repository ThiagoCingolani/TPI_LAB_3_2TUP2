import { useState, useRef, useContext } from "react";
import { Alert, Button, Form, FloatingLabel, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false, exist: false });
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthenticationContext);

  const changeEmailHandler = (event) => {
    setErrors({ ...errors, email: false });
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setErrors({ ...errors, password: false });
    setPassword(event.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    if (!email.includes("@gmail.com") && !email.includes("@hotmail.com")) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      return;
    }

    if (!password) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/Users?Email=${email}&password=${password}`);
      const users = await response.json();

      if (users.length === 1) {
        const user = users[0];
        handleLogin(user.email, user.role);
        navigate("/");
      } else {
        setErrors({ ...errors, exist: true });
        alert("Ha ingresado mal su email o su contraseña, vuelva a intentarlo")
      }
    } catch (error) {
      setErrors({ ...errors, exist: true });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 px-5 shadow" style={{ width: "500px", height: "400px" }}>
        <Card.Body>
          <Form className="text-center">
            <h1>Iniciar Sesión</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel label="Ingresar su Email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  required
                  onChange={changeEmailHandler}
                  ref={emailRef}
                  value={email}
                  className={errors.email && "border border-danger"}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel controlId="floatingPassword" label="Ingresar su contraseña">
                <Form.Control
                  placeholder="Password"
                  className={errors.password && "border border-danger"}
                  type="password"
                  required
                  onChange={changePasswordHandler}
                  value={password}
                  ref={passwordRef}
                />
              </FloatingLabel>
            </Form.Group>
            <Button variant="success" type="submit" onClick={loginHandler}>
              Iniciar Sesión
            </Button>
            <h6>No tenes una cuenta creada?<Button variant="link" className="fw-bold pt-1" onClick={()=>{navigate("/register")}}>Creá tu cuenta</Button></h6>
          </Form>
          {(errors.email || errors.password) && (
              <div className="mt-3 mb-3">
                <Alert variant="danger">Complete los campos y/o cumpla los criterios</Alert>
              </div>
            )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;