import React, { useEffect, useState } from "react";
import NavbarProfil from "../components/NavbarProfil";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ResultsList from "../components/ResultsList";
import { base_url } from "../../baseURL";


const Results = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const { id,id_examen,statut}= useParams(); 

    
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

    const containertable ={
    width : '100%',
   };


    return(
        <div>
        <NavbarProfil nom={nom} prenom={prenom} homePageURL={urlLogo} />
        <Container fluid className="contentContainer" style={{ backgroundColor: 'rgba(142, 202, 230, 0.34)', 
        minHeight: '100vh' , padding: '20px 0' }}>

            <div style={containertable}>
              <ResultsList/>

            </div>

        </Container>
        </div>
    );
};

export default Results;