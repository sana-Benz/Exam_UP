import React, { useState, useEffect } from 'react';
import MenuExaminateur from "../components/MenuExaminateur";
import NavbarProfil from "../components/NavbarProfil";
import { useParams } from 'react-router-dom';
import { base_url } from "../../baseURL";


  const HeaderExaminateur = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const { id }= useParams(); 

  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${base_url}utilisateur/${id}`);
          if (!response.ok) {
            throw new Error('Erreur de réseau ou réponse non valide');
          }
          const data = await response.json();
          setNom(data.nom);
          setPrenom(data.prenom);
        } catch (error) {
          console.error("Erreur lors de la récupération des données de l'utilisateur", error);
        }
      };
  
      if (id) {
        fetchUserData();
      }
    }, [id]);

   const urlLogo =`/profile-examinateur/${id}`;
  return (
      <div>
              <NavbarProfil nom={nom} prenom={prenom} homePageURL={urlLogo} />
              <MenuExaminateur />
      </div>
  )
}

export default HeaderExaminateur
