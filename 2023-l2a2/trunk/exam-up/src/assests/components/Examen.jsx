import React, { useState, useEffect } from "react";
import QuestionExamen from "./QuestionExamen";
import { useNavigate,useLocation, useParams } from "react-router-dom";
import { base_url } from "../../baseURL";


const Examen = ({ id_examen, etat }) => {
  const{id}= useParams();
  const [arrayQuestionId, setArrayQuestionId] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [soumis, setSoumis]= useState(false);
  const navigate = useNavigate();


  //cherche les données enregistrées au chargement de la page
  useEffect(() => {
    const storedResponses = localStorage.getItem(`idReponses_${id_examen}`);
    if (storedResponses) {
      setAllResponses(JSON.parse(storedResponses));
    } else {
      setAllResponses([]); // initialisation
    }
  }, [id_examen]);

  //retourne un array des ids des questions de l'examen
  useEffect(() => {
    const getQuestionList = async () => {
      try {
        const response = await fetch(
          `${base_url}questions_examen/${id_examen}`
        );
        const jsonData = await response.json();
        setArrayQuestionId(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
    getQuestionList();
  }, [id_examen]);

  //met à jour les options selectionnées
  const handleUpdateResponse = (questionId, selectedOptions) => {
    setAllResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(res => res.id_question === questionId);
      if (existingResponseIndex !== -1) {
        const updatedResponses = [...prevResponses];
        updatedResponses[existingResponseIndex] = { id_question: questionId, id_option: selectedOptions }; 
        return updatedResponses;
      } else {
        return [...prevResponses, { id_question: questionId, id_option: selectedOptions }]; 
      }
    });
  };
  
  // affiche les réponses sélectionnées
  useEffect(() => {
  console.log("voici les réponses sélectionnées", allResponses);
}, [allResponses]);

// enregistre les réponses sélectionnées dans le localStorage
useEffect(() => {
  localStorage.setItem(`idReponses_${id_examen}`, JSON.stringify(allResponses));
}, [allResponses, id_examen]);

  //fonction pour soumettre les réponses de l'eaxmen
  const handleSubmit = async () => {
    
      try {
        const response = await fetch(
          `${base_url}Envoyer_reponses_examine/${id}/${id_examen}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(allResponses),
          }
        );
        await response.json();
        console.log("réponses envoyées à la base de données!");
        //localStorage.removeItem(`idReponses_${id_examen}`);
        navigate(`/Profile_examine/${id}`);
      } catch (error) {
        console.error("Erreur:", error);
      }
    
  };

  //va déclencher la soumission de l'examen
  useEffect(() => {
    if (etat && !soumis) {
      handleSubmit();
      setSoumis(true);
    }
  }, [etat, soumis]);

  

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      {arrayQuestionId.map((questionId, index) => (
        <div key={index} style={{ marginTop: "10px", marginRight: "10px" }}>
          <QuestionExamen
            id_question={questionId.id}
            id_examen={id_examen}
            indice={index}
            etat={etat}
            onUpdateResponse={handleUpdateResponse}

          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(Examen);
