import React, { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import HeaderExaminateur from "../components/HeaderExaminateur";
import "./style/ExamDetails.css";
import ModalComponent from "../components/ModalComponent";
import EditExamInfo from "../components/EditExamInfo";
//import ParticipantsList from "./ParticipantsList";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const ExamDetails = () => {
  
  const [examStarted, setExamStarted] = useState();
  const navigate = useNavigate();


  const { id, id_examen,statut } = useParams();
  let buttons;

  const corrigeExamen = async(id,id_examen) =>{
    try{
      const response = await fetch(
      `${base_url}corriger_examen/${id}/${id_examen}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
      }
    );
    window.location.href=`/résultats/${id}`;
   }catch(err){
      console.error(err);
    }
  }
  
  useEffect(() => {
    const getExamSituation = async (id, id_examen) => {
      try {
        const response = await fetch(`${base_url}situation_examen/${id}/${id_examen}`);

        if (response.ok) {
          const data = await response.json(); 

          if (data.situation === "active") { 
            setExamStarted(true);

          } else {
            setExamStarted(false);
          }
        } else {
          throw new Error('Réponse non-ok depuis le serveur');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la situation de l'examen :", error);
      }
    };
  
    getExamSituation(id, id_examen);
  }, [id, id_examen]);
  
  

  // ce qui se passe quand on confirme la suppression de l'examen
  //delete function
  const deleteExam = async (id, id_examen) => {
    if (id_examen) {
      const deletedExam = await fetch(
        `${base_url}examen/${id}/${id_examen}`,
        {
          method: "DELETE",
        }
      );
    navigate(`/profile-examinateur/${id}`);
    } else {
      console.error("id de l'examen est non défini");
    }
  };

  //fonctionne bien en_ligne --> cree
  const retirerExam = async (e, id, id_examen) => {
    try {
      const response = await fetch(
        `${base_url}Retirer_examen/${id}/${id_examen}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();
      if (data === "Examen retiré") {
        console.log("Examen retiré avec succés");
      }
     navigate(`/profile-examinateur/${id}`);
    } catch (err) {
      console.error(err.message);
    }
  };

  const ActivateExam = async (id, id_examen) => {
    try {
        setExamStarted(true);
        const response = await fetch(
            `${base_url}lancer_examen/${id}/${id_examen}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        if (response.ok) {
            console.log("Examen lancé avec succès");
        } else {
            console.error("Échec du lancement de l'examen");
        }
    } catch (err) {
        console.error("Erreur lors de la communication avec le serveur :", err.message);
    }
};


  // cree-->en_ligne
  //doit vérifier que les dates renseignées sont valides avant de mettre en ligne en +
  const OnlineExam = async (e, id, id_examen) => {
        try {
          const en_ligne = await fetch(
            `${base_url}Mettre_en_ligne_examen/${id}/${id_examen}`,
            {
              method: "PUT",
            }
          );
          if(en_ligne.status === 400){
            alert("Les dates de début et de fin doivent être définies avant de mettre l'examen en ligne")
          }else{
            navigate(`/examens-en-ligne/${id}`);
          }
        } catch (err) {
          console.error(err.message);
        }
  };

  const voirResults = async () => {
    navigate(`/Results/${id}/${id_examen}`);
  };

  switch (statut) {
    case "en_ligne":
      buttons = (
        <div className="d-grid gap-3">
          <Link
            to={`/aperçu_examen/${id}/${id_examen}`}
            className="btn btn-light btn-lg"
            role="button"
          >
            Consulter les questions
          </Link>
          
          <Link
            to={`/Liste_Participants/${id}/${id_examen}`}
            className="btn btn-light btn-lg"
            role="button"
          >
            Modifier la liste des participants
          </Link>

          <button
           className={`btn ${examStarted ? "btn-danger" : "btn-success"} btn-lg`}
           type="button"
           onClick={(e) => ActivateExam(id, id_examen)}
           >
           {examStarted ? "L'examen a été lancé" : "Lancer l'examen"}
          </button>

          <ModalComponent buttonTitle="Terminer l'examen" modalTitle="Terminer l'examen" 
            modalBody ="êtes-vous sûr de vouloir terminer l'examen et lancer la correction? ?"
            closeText ="Annuler" confirmText="confirmer" buttonSize="lg" buttonStyle="success" handleConfirm={() => corrigeExamen(id,id_examen)}/>

          <button
            className="btn btn-danger btn-lg"
            type="button"
            onClick={(e) => retirerExam(e, id, id_examen)}
          >
            Retirer l'examen
          </button>
        </div>
      );
      break;

    case "corrige":
      buttons = (
        <div className="d-grid gap-3">
          <Link
            to={`/aperçu_examen/${id}/${id_examen}`}
            className="btn btn-light btn-lg"
            role="button"
          >
            Consulter les questions
          </Link>
          <button className="btn btn-success btn-lg" type="button" onClick={voirResults}>
            Voir les résultats 
          </button>
          {/*modal suppression d'examen*/}
          <ModalComponent
            modalTitle="Suppression d'examen"
            buttonTitle="Supprimer l'examen"
            buttonStyle="danger"
            buttonSize="lg"
            modalBody={"êtes-vous sûr(e) de vouloir supprimer l'examen ?"}
            closeText="fermer"
            confirmText="confirmer"
            handleConfirm={() => deleteExam(id, id_examen)}
          />
        </div>
      );
      break;

    default:
      /* case cree*/
      buttons = (
        <div className="d-grid gap-3">
          {/* bouton Modifier infos examen , on passe comme argument id de user et id de l'examen*/}
          <EditExamInfo id={id} id_examen={id_examen} />
              <button className="btn btn-light btn-lg" type="button" on onClick={handelClick}>
                Modifier les questions
              </button>

          <button
            className="btn btn-success btn-lg"
            type="button"
            onClick={(e) => OnlineExam(e, id, id_examen)}
          >
            Mettre en ligne
          </button>

          {/* bouton supprimer examen*/}
          <ModalComponent
            modalTitle="Suppression d'examen"
            buttonTitle="Supprimer l'examen"
            buttonStyle="danger"
            buttonSize="lg"
            modalBody={"êtes-vous sûr(e) de vouloir supprimer l'examen ?"}
            closeText="fermer"
            confirmText="confirmer"
            handleConfirm={() => deleteExam(id, id_examen)}
          />
        </div>
      );
      break;
  }

  function handelClick() {
    console.log("button clicked");
    navigate(`/CreationQuestion/${id}/${id_examen}/${statut}`);
  }


  return (
    <div className="pageContainer">
      <HeaderExaminateur />

      <Container
        fluid
        className="contentContainer d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "rgba(142, 202, 230, 0.34)",
          minHeight: "100vh",
        }}
      >
        <div className="dessus">
          {/* Button list */}
          <h1
            style={{
              marginTop: "0",
              color: "#000000",
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
          >
            Paramètres de l'examen :
          </h1>
          {buttons}
        </div>
      </Container>
    </div>
  );
};

export default ExamDetails;
