import React from 'react';
import { Link } from 'react-router-dom';
import Logo_Nom_de_site from "../images/Logo_Nom_de_site.svg";
import Button from './button';

const Navbar = () => {
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px 16 px 24px',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 6px 0px rgba(0, 0, 0, 0.02)'
      };
    
      const logoStyle = {
        height: '70px', 
        width: 'auto' 
      };

      const navbarlinks = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px', 
      };

      const linkStyle = {
        textDecoration: 'none',
        fontFamily :'Montserrat, sans-serif',
        color: '#023047', 
        margin: '0 12px', 
        padding: '16px 0px',
      };

  return (
    <nav style={navbarStyle}>
      <div className="navbar-brand">
        <img src= {Logo_Nom_de_site} alt="ExamUp Logo" style={logoStyle }/>
      </div>
      <div style={navbarlinks}>
        <div style={linkStyle}>Accueil</div>
        <div style={linkStyle}>Fonctionnalités</div>
        <div style={linkStyle}>Comment ça marche</div>

        <Link to="/LogIn">
         <Button
         text="Se connecter"
         fontSize='16px'
         color="#023047" // Couleur du bouton 
         textColor="#FFFFFF" // Couleur du texte
         hoverColor="#FFFFFF" // Couleur du bouton au survol
         hoverTextColor="#023047" // Couleur du texte au survol
         hoverBorderColor="#023047"
         width="180px" />
         </Link>
      </div>

    </nav>
  );
};

export default Navbar;
