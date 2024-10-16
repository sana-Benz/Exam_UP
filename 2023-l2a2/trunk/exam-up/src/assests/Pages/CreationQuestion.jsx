import React, { useEffect, useState } from "react";
import NavbarProfil from "../components/NavbarProfil";
import {Container } from "react-bootstrap"; 
import Button from "../components/button";
import "./style/CreationExamen.css";
import { Link, useParams } from "react-router-dom";
import QuestionsList from "../components/QuestionsList";
import { base_url } from "../../baseURL";


function CreationQuestion({}) {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');

    const { id,id_examen,statut}= useParams(); 

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`${base_url}/utilisateur/${id}`);
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

     const containertable ={
      width : '100%',
     };

    return(
        <div>
        <NavbarProfil nom={nom} prenom={prenom} homePageURL={urlLogo} />
        <Container fluid className="contentContainer" style={{ backgroundColor: 'rgba(142, 202, 230, 0.34)', 
        minHeight: '100vh' , padding: '20px 0' }}>
                    
                <div className="questions" style={containertable}>
                    {/* liste des questions*/}
                    <QuestionsList/>
                        
                        <Link to={`/Détails-examen/${id}/${id_examen}/${statut}`}>
                        <Button
                         text="Sauvgarder"
                         fontSize='14px'
                         color="#023047" // Couleur du bouton 
                         textColor="#FFFFFF" // Couleur du texte
                         hoverColor="#FFFFFF" // Couleur du bouton au survol
                         hoverTextColor="#023047" // Couleur du texte au survol
                         hoverBorderColor="#023047"
                         width="160px" />
                         </Link>

                </div>


       </Container> 

       </div>

    );

}

export default CreationQuestion;