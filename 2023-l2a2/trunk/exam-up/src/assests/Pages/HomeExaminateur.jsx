import React, {useState} from 'react';
import {Container  } from "react-bootstrap"; 
import ModalComponent from '../components/ModalComponent';
import ExamList from "../components/ExamList"; 
import HeaderExaminateur from '../components/HeaderExaminateur';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { base_url } from "../../baseURL";

// a été modifié

const HomeExaminateur = () => {
  const [titre, setTitre] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

 
  // ce qui se passe quand on confirme la création de l'examen
  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log('Confirm button clicked');
    try {
      const body = { titre };
      const response = await fetch(`${base_url}examen/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Examen créé:', responseData);
        navigate(`/profile-examinateur/${id}`);
        } else {
        console.error('Erreur lors de la création de l’examen');
        if (response.headers.get('Content-Type').includes('application/json')) {
          console.error('Détails de l’erreur:', await response.json());
        }
      }
    } catch (error) {
      console.error('Erreur lors de la communication avec le serveur:', error);
    }
  };
  

  

  return (
    <div className="pageContainer">
       <HeaderExaminateur/>
      
      <Container fluid className="contentContainer" style={{ backgroundColor: 'rgba(142, 202, 230, 0.34)', 
      minHeight: '100vh' , padding: '20px 0' }}>

        <div className="buttonContainer">

          {/* Modal créer un examen*/}
          <ModalComponent modalTitle = "création d'examen"  buttonTitle="+ créer un nouveau examen" 
           buttonStyle="outline-info"  buttonSize="lg"  
           modalBody=  {
            <Form> 
                <Form.Label>Titre:</Form.Label>
                <Form.Control type="text" placeholder="Examen xxx" 
                value={titre}
                onChange={(e) => setTitre(e.target.value)} 
                required/>
            </Form>  
              }

           closeText="fermer" confirmText="confirmer"
             handleConfirm={handleConfirm}
           />

        </div>


          {/* liste des examens créés*/}
        <ExamList listTitle="Examens créés" statut = "cree" />

      </Container>

    </div>
  );
}


export default HomeExaminateur;
