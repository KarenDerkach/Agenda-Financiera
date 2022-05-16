import React from "react";
import { Link } from "react-router-dom";
import './ErrorPage.css';

const gifsErrors = ['d2jjuAZzDSVLZ5kI', 'Bp3dFfoqpCKFyXuSzP', 'hv5AEBpH3ZyNoRnABG', 'hLwSzlKN8Fi6I'];



export default function ErrorPage() {
  const randomImage = () => {
    return `https://media.giphy.com/media/${gifsErrors[Math.floor(Math.random() * gifsErrors.length) + 1 ]}/giphy.gif`
  }

  return (
    <>
    
      <div className="App-wrapper">
        <div className="pageErrorStyles">
            <span className="codeErrorStyles">UPS! Error 404</span>
            <span className="msgErrorStyles">Dirección no encontrada</span>
            <img  className="gifErrorStyles"src={randomImage()} alt="alt-page-404"/>
           <Link to='/'> <button className="btn btn-outline-danger">Ir al inicio</button></Link>
        </div>
      </div>
    </>
  );
}