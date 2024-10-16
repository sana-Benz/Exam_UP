import React, { useState } from "react";
import "./style/Signupstyle.css";
import Button from '../components/button.jsx';
import Logo_Nom_de_site from "../images/Logo_Nom_de_site.svg";
import des_ellipses from "../images/des_ellipses.svg";
import axios from 'axios';
import { base_url } from "../../baseURL";

function SignupPage() {
  const [name, setName] = useState("");
  const [familyname, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [conemail, setConEmail] = useState("");  //ConEmail <==> confirmation email
  const [password, setPassword] = useState("");
  const [conpassword, setConPassword] = useState("");  //ConPassword <==> confirmation mot de passe
  const [role, setRole] = useState("")

    // Fonction de l'inscription
    const handleSignup = async () => {
      if (email !== conemail) {
        alert("Les emails ne se correspondent pas.");
        return;
      }
      if (password !== conpassword) {
        alert("Les mots de passe ne se correspondent pas.");
        return;
      }
  
      try {
        console.log({ prenom: name, nom: familyname, email, mdp: password, role });
        const body = { prenom: name, nom: familyname, email, mdp: password, role };
        const response = await axios.post(`h${base_url}auth/register`, body);
        console.log(response.data);
        window.location.href = "/"; 
        
      } catch (error) {
        console.error(error.response.data);
        alert("Erreur lors de l'inscription : " + error.response.data);
      }
    };
  
    
    const handleRoleChange = (event) => {
      setRole(event.target.value);
    }

  return (
    <div className="connexion_ellipses">
      <img src={des_ellipses} alt="Logo" className="ellipses" />

    <div className="connexion">

      <img src={Logo_Nom_de_site} alt="Logo" className="Signup-logo" />

      <div className="signup-content">
        <h1>Créer un nouveau compte</h1>

        <form className="signup-form">

          <div className="name-familyname">

          <div className="name">

          <label htmlFor="familyname" className="signup-label">
           Nom
          </label>
          <input
            type="text"
            id="familyname"
            className="input-name"
            placeholder="Entrez votre nom"
            value={familyname}
            onChange={(e) => setFamilyName(e.target.value)}
          />

          </div>

          <div className="name">
          <label htmlFor="name" className="signup-label">
            Prénom
          </label>
          <input
            type="text"
            id="name"
            className="input-name"
            placeholder="Entrez votre prenom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          </div>

          </div>

          <div className="radio-group">
          <p className="signup-label">Choisi votre role</p>
          <input type="radio" id="examinator" name="role" value="examinateur" className="input" onChange={handleRoleChange}/>
          <label htmlFor="examinator" className="radio">Examinateur</label>

          <input type="radio" id="examinee" name="role" value="examine" className="input" onChange={handleRoleChange} />
          <label htmlFor="examinee" className="radio">Examiné</label>

          </div>


          <label htmlFor="email" className="signup-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Entrez votre email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor="email" className="signup-label">
          Confirmation de email
          </label>
          <input
            type="email"
            id="conemail"
            placeholder="Confirmez votre email"
            className="input"
            value={conemail}
            onChange={(e) => setConEmail(e.target.value)}
          />

          <label htmlFor="password" className="signup-label">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

           <label htmlFor="password" className="signup-label">
           Confirmation de mot de passe
          </label>
          <input
            type="password"
            id="conpassword"
            placeholder="Confirmez votre mot de passe"
            className="input"
            value={conpassword}
            onChange={(e) => setConPassword(e.target.value)}
          />


        </form>

        <Button
          text="S'inscrire"
          color="#FB8500" // Couleur du bouton
          textColor="#FFFFFF" // Couleur du texte
          hoverColor="#FFFFFF" // Couleur du bouton au survol
          hoverTextColor="#FB8500" // Couleur du texte au survol
          hoverBorderColor="#FB8500"
          width="90%"
          onClick={handleSignup}  //ajout d'un evenment, au clique de button la fonction handelSigneup se declanche ce qu'il permets l'inscription. 
        />

      </div>

    </div>

    </div>
  );
}

export default SignupPage;