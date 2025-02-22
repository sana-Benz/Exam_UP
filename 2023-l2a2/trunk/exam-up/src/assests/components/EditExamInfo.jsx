import React,{useState, useEffect} from 'react'
import {Form} from  "react-bootstrap";
import ModalComponent from "./ModalComponent";
import { useNavigate } from 'react-router-dom';
import { base_url } from "../../baseURL";

const EditExamInfo = ({ id , id_examen }) => { 
  const dateDuJour = new Date();
  const offset = dateDuJour.getTimezoneOffset();
  const navigate = useNavigate();

  
  const todayLocal = new Date(dateDuJour.getTime() - (offset * 60 * 1000));
  const dateDuJourFormatted = todayLocal.toISOString().split('T')[0];
  

    const [title, setTitle] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");

    
    // cherche les détails de l'examen de la base de données
    const getExamDetails = async (id ,id_examen) => {
      try {
        const response = await fetch(`${base_url}examen/${id}/${id_examen}`);
        const data = await response.json();
        console.log(data);
        // Extract titre, date_debut, et date_fin de l'examen
        const { titre, date_debut, date_fin } = data;

        // formattage des dates pour s'afficher correctement dans le modal
       const date_debut_formatted = new Date(date_debut).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
       const date_fin_formatted = new Date(date_fin).toLocaleDateString('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');

       // Initialiser les variables locales avec les valeurs formatées
       setTitle(titre);
       setDateDebut(date_debut_formatted);
       setDateFin(date_fin_formatted);

      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      getExamDetails(id,id_examen); 
    }, [id,id_examen]); 

    const [oldtitle, setOldTitle] = useState(title);
    const [oldDateDebut, setOldDateDebut] = useState(dateDebut);
    const [oldDateFin, setOldDateFin] = useState(dateFin);

    // fonction appelée quand on clique sur confirmer
    const updateExamInfo = async (id_examen) => {
      
      try {
        const body = { titre: title, date_debut: dateDebut, date_fin: dateFin };
        console.log(body);
        
        if (title !== oldtitle) {
          await fetch(`${base_url}Mettre_a_jour_titre_examen/${id_examen}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body),
          });
        }
        if (dateDebut !== oldDateDebut || dateFin !== oldDateFin) {

            if (dateDebut < dateFin && dateFin >= dateDuJourFormatted){
                // NB j'ai besoin de vérifier aussi que dateFin - dateDebut > durée
          await fetch(`${base_url}Mettre_a_jour_date_examen/${id_examen}`, {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body),
          });
            }else{
                console.error("Date invalide");
            }
          
        }
        navigate(`/profile-examinateur/${id}`); //retour à l'accueil
      } catch (err) {
        console.error(err.message);
      }
    };


    return (
      <>
        {/* Modal for updating exam info */}

        <ModalComponent
          modalTitle="Informations sur l'examen"
          buttonTitle="Modifier infos examen"
          buttonStyle="light"
          buttonSize="lg"
          modalBody={
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Titre:</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="dateDebut">
                <Form.Label>Date de début:</Form.Label>
                <Form.Control
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="dateFin">
                <Form.Label>Date de fin:</Form.Label>
                <Form.Control
                  type="date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
          }
          closeText="annuler"
          confirmText="sauvegarder"
          handleConfirm={() => updateExamInfo(id_examen)}
          
        
        />
      </>
    );
  }
  
  export default EditExamInfo;