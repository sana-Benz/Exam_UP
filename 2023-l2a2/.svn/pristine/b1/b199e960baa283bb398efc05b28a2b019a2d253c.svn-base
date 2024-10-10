// QuestionExamen.js
import React, { useState, useEffect } from "react";
import OptRepList from "./OptRepList";
import "../Pages/style/QuestionExamen.css";
import { base_url } from "../../baseURL";

const QuestionExamen = ({ id_question, id_examen, indice, etat, onUpdateResponse }) => {
  const [questionInfo, setQuestionInfo] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  //met à jour les réponses sélectionnées
  const handleUpdateResponse = (questionId, selectedOptions) => {
    setSelectedOptions(prevState => {
      const updatedOptions = [...prevState];
      const index = updatedOptions.findIndex(option => option.id_question === questionId);
      if (index !== -1) {
        updatedOptions[index] = { id_question: questionId, options: selectedOptions };
      } else {
        updatedOptions.push({ id_question: questionId, options: selectedOptions });
      }
      return updatedOptions;
    });
  };

  //charge les informations d'une question de la bdd
  useEffect(() => {
    const getQuestion = async () => {
      try {
        const response = await fetch(
          `${base_url}question/${id_question}`
        );
        const jsonData = await response.json();
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          setQuestionInfo(jsonData[0]);
        } else {
          console.error("erreur de chargement de la question");
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    getQuestion();
  }, [id_question]);

  return (
    <div className="Big_container">
      <div className="Horizontal_container">
        <div className="Question_container">
          Question {indice + 1}: {questionInfo.enonce}
        </div>
        <div className="Points_container">
          <span> {questionInfo.nb_points} point(s)</span>
        </div>
      </div>

      <div>
        <OptRepList
          id_question={id_question}
          type_question={questionInfo.type}
          id_examen={id_examen}
          etat={etat}
          onUpdateResponse={onUpdateResponse}
        />
      </div>
    </div>
  );
};

export default QuestionExamen;
