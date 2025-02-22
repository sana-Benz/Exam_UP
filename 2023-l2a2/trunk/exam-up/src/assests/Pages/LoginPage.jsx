import React, { useState } from "react";
import "./style/Loginstyle.css";
import Button from '../components/button.jsx';
import Logo_Nom_de_site from "../images/Logo_Nom_de_site.svg";
import des_ellipses from "../images/des_ellipses.svg";
import {useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "../../context/AuthProvider";



function LoginPage({ onNotSignUpYetClick, onForgotPasswordClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  let navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.post(`${base_url}auth/login`, {
        email: email,
        mdp: password
      });
      const { token, role } = response.data;  
      console.log("Connexion réussie, token:", token);
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            const userId = decoded.user.id;                     //il faut ajouter if (role === examine) lorsque on devloper le profl examiner
            login(userId, role);
            if (role === "examinateur") {
              navigate(`/profile-examinateur/${userId}`);
            } else if (role === "examine") {
              navigate(`/Profile_examine/${userId}`);
            }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data);
      } else {
        console.log('Error', error.message);
      }
    }
  };

  return (
    <div className="inscreption_ellipses">
      <img src={des_ellipses} alt="Logo" className="ellipses" />

    <div className="inscreption">

      <img src={Logo_Nom_de_site} alt="Logo" className="login-logo" />

      <div className="login-content">
        <h1>Welcome back!</h1>

        <p className="login-subtitle">
          Veuillez s'il vous plaît insérer vos données
        </p>

        <form className="login-form">

          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="login-label">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-footer">

            <p className="p1">  Toujours pas inscrit? <Link to="/SignUp" onClick={onNotSignUpYetClick} className="login-link1">
            Cliquez ici
            </Link></p>
            <a href="#forgot-password" onClick={onForgotPasswordClick} className="login-link">
              Mot de passe oublié?
            </a>

          </div>
          {error && <p className="error">{error}</p>}
        </form>

        <Button
          text="Se connecter"
          color="#FB8500" // Couleur du bouton
          textColor="#FFFFFF" // Couleur du texte
          hoverColor="#FFFFFF" // Couleur du bouton au survol
          hoverTextColor="#FB8500" // Couleur du texte au survol
          hoverBorderColor="#FB8500"
          width="100%"
          onClick={handleLogin}
        />

      </div>

    </div>

    </div>
  );
}

export default LoginPage;