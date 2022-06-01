import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logout } from "../../redux/actions/User/userActions";
import { useSelector, useDispatch } from "react-redux";

export default function Main() {
  const user = useSelector((state: any) => state.stateUser);
  //  console.log("este este el estado del usuario", user.isLogged)
  const dispatch = useDispatch();

  const [userLogin , setUserLogin] = useState(user.isLogged);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
    const foundUser = JSON.parse(loggedInUser);
    setUserLogin(foundUser);
    }
    }, [user]);

   // console.log("USUARIO", userLogin.ok)

  const logOut = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    setUserLogin(false);
  };
  return (
    <div>
      {userLogin.ok ? (
        <Button variant="outline-warning" onClick={logOut}>
          Salir
        </Button>
      ) : (
        <>
          {" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "transparent" }}
          >
            <Button variant="outline-secondary">Ingresar</Button>
          </Link>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "transparent" }}
          >
            {" "}
            <Button variant="outline-light">Registrarse</Button>
          </Link>
        </>
      )}
    </div>
  );
}
