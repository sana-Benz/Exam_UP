import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from "react-bootstrap/Navbar";  
import Logo_Nom_de_site from "../images/Logo_Nom_de_site.svg"
import "../Pages/style/NavbarProfil.css"
import ModalComponent from "./ModalComponent";

// ce composant sera le navbar pour utilisateur ; il suffit de renseigner le nom prenom et le homePage quand on clique sur le logo
// Ne plus toucher les styles

const NavbarProfil = ({nom, prenom, homePageURL}) => {   

  const deconnexion = ( ) =>{
    window.location.href = `/`;
  };

  return (
    <Navbar
      className="bg-body-tertiary"
      style={{ height: "100px", padding: "16px 24px" }}
    >
      <div className="wrapper">
        <div className="logo">
          <Navbar.Brand>
            <a href={homePageURL}>
              <img
                src={Logo_Nom_de_site}
                width="274"
                height="90"
                className="d-inline-block align-top"
                alt="logo du site"
                style={{ marginRight: "20px" }}
              />
            </a>
          </Navbar.Brand>
        </div>

        <div className="WelcomText" style={{ display: 'flex', alignItems: 'center' }}>

          
          <Navbar.Text
            style={{
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "22px",
              lineHeight: "29.26px",
              textAlign: "center",
              color: "#023047",
            }}
          >
            Bienvenue{" "}
            <a
              href="/ProfilePage"
              style={{ color: "#023047" }}
            >
              {nom + " " + prenom }
            </a>
          </Navbar.Text>

            <ModalComponent buttonTitle="Déconnexion" modalTitle="Déconnexion" 
            modalBody ="êtes-vous sûr de vouloir vous déconnecter ?"
            closeText ="Annuler" confirmText="confirmer" buttonStyle="dark" handleConfirm={deconnexion}/>


        </div>

      </div>

      
    </Navbar>
  );
}

export default NavbarProfil;

