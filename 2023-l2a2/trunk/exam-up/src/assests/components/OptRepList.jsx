import React, { useState, useEffect } from "react";
import "../Pages/style/OptRepList.css";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { base_url } from "../../baseURL";

const OptRepList = ({ id_question, type_question, onUpdateResponse }) => {
  const { id } = useParams();
  const [arrayReponses, setArrayReponses] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  //traiter la selection d'option
  const handleUpdateResponse = (idOption) => {
    if (type_question === 'QCU') {
      setSelectedOptions([idOption]);
    } else {
      setSelectedOptions(prevOptions => {
        if (prevOptions.includes(idOption)) {
          return prevOptions.filter(option => option !== idOption);
        } else {
          return [...prevOptions, idOption];
        }
      });
    }
  };

  useEffect(() => {
    // passer les options selectionnées à QuestionExamen
    onUpdateResponse(id_question, selectedOptions);
  }, [selectedOptions]);

  // charger les options de réponses de chaque question avec son id
  useEffect(() => {
    const getOptRep = async () => {
      try {
        const response = await fetch(`${base_url}reponses_possibles/${id_question}`);
        const jasonData = await response.json();
        if (Array.isArray(jasonData)) {
          setArrayReponses(jasonData);
        } else {
          console.error("erreur de chargement de réponses");
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    getOptRep();
  }, [id_question]);

  return (
    <div className="Big_Container">
      <p className="consigne">Veuillez choisir la ou les réponse(s) correcte(s) :</p>
      <div className="Smaller_Container">
        <Form>
          {arrayReponses.map((reponse) => (
            <div key={reponse.id} className="response_container">
              {type_question === 'QCM' ? (
                <div>
                  <input
                    type="checkbox"
                    id={reponse.id}
                    value={reponse.texte}
                    className="reponse"
                    onChange={() => handleUpdateResponse(reponse.id)}
                  />
                  <label htmlFor={reponse.id}>{reponse.texte}</label>
                </div>
              ) : (
                <div>
                  <input
                    type="radio"
                    id={reponse.id}
                    name="reponse"
                    value={reponse.texte}
                    className="reponseA"
                    onChange={() => handleUpdateResponse(reponse.id)}
                  />
                  <label htmlFor={reponse.id}>{reponse.texte}</label>
                </div>
              )}
            </div>
          ))}
        </Form>
      </div>
    </div>
  );
};

export default OptRepList;
