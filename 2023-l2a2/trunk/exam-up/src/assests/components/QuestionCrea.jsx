import React, { useState, useEffect } from "react";
import "../Pages/style/QuestionCreation.css";
import { Form, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ReponseCrea from "./ReponseCrea";
import { base_url } from "../../baseURL";

//component qui permet au professeur d'indiquer les informations sur une question

const QuestionCrea = () => {
  const { id, id_examen, id_question } = useParams(); //va m'indiquer si la question existe
  const id_user = id;
  console.log("id de l'examinateur=", id_user);
  const [infosQuestion, setInfosQuestion] = useState([]);

  //pour stocker les valeurs des champs
  const [titre_q, setTitre_q] = useState("");
  const [duree_q, setDuree_q] = useState("00:01:00");
  const [bareme_q, setBareme_q] = useState("1");
  const [type_q, setType_q] = useState("");
  const [type_q_DB, setType_q_DB] = useState("");

  const validerInput = () => {
    if (
      titre_q.trim() === "" ||
      isNaN(parseFloat(duree_q)) ||
      isNaN(parseFloat(bareme_q)) ||
      type_q === "" ||
      parseFloat(bareme_q) <=0
    ) {
      console.log(
        "Il faut renseigner tous les champs avec des valeurs valides"
      );
      return false;
    }
    return true;
  };

  const handleTitreChange = (e) => {
    setTitre_q(e.target.value);
  };

  const handleDureeChange = (e) => {
    const value = e.target.value === "" ? "00:01:00" : e.target.value;
    setDuree_q(value);
  };

  const handleBaremeChange = (e) => {
    setBareme_q(e.target.value);
  };
  

  const handleTypeChange = (e) => {
    setType_q(e.target.value);
  };
  const QuestionExiste = () => {
    //get toutes les informations d'une question si la question existe déjà en bdd

    const getInfosQuestion = async () => {
      try {
        const response = await fetch(
          `${base_url}question/${id_question}`
        );
        const jasonData = await response.json();
        setInfosQuestion(jasonData);
        setType_q_DB(jasonData[0].type);
        setType_q(jasonData[0].type);
        setTitre_q(jasonData[0].enonce);
        setDuree_q(jasonData[0].duree);
        setBareme_q(jasonData[0].nb_points);
      } catch (err) {
        console.error(err.message);
      }
    };
    useEffect(() => {
      getInfosQuestion();
    }, []);

    const handleSubmit = async () => {
      if (!validerInput()) {
        console.log("il faut que tous les champs soient valides"); //ajouter alerte plus tard
        return;
      }
      if (bareme_q === "") {
        setBareme_q("1");
      }
      try {
        const body = { titre_q, duree_q, bareme_q, type_q };
        console.log(body);
        const response = await fetch(
          `${base_url}Mettre_a_jour_infos_question/${id_question}`,
          {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body),
          }
        );
      } catch (err) {
        console.error(err.message);
      }
      console.log("put request sent !");
      window.location.href = `/infos_reponses/${id_user}/${id_examen}/${id_question}/${type_q}`;
    };

    if (infosQuestion.length > 0) {
      return (
        <>
          <div className="big_container">
            <div className="flex_container">
              <div className="temps_container">
                Temps question :
                <Form.Control
                  type="text"
                  style={{ height: "30px", width: "110px", textAlign: "left" }}
                  value={duree_q}
                  onChange={handleDureeChange}
                />
              </div>
              <div className="barème_container">
                Barème question :
                <Form.Control
                  type="text"
                  style={{ height: "30px", width: "110px", textAlign: "left" }}
                  value={bareme_q}
                  onChange={handleBaremeChange}
                />
              </div>
            </div>

            <div className="Question_container">
              <p className="paragraphe">Intitulé de la question :</p>
              <textarea
                style={{ textAlign: "left" }}
                value={titre_q}
                onChange={handleTitreChange}
              />
            </div>

            <div className="question-type">
              Choisir le type de la question:
              <div className="custom-radio">
                <input
                  type="radio"
                  id="qcm"
                  name="questionType"
                  value="QCM"
                  defaultChecked={type_q_DB === "QCM"}
                  onChange={handleTypeChange}
                  className="radioB"
                />
                <label htmlFor="qcm" data-label="QCM"></label>
              </div>
              <div className="custom-radio">
                <input
                  type="radio"
                  id="qcu"
                  name="questionType"
                  value="QCU"
                  defaultChecked={type_q_DB === "QCU"}
                  onChange={handleTypeChange}
                  className="radioB"
                />
                <label htmlFor="qcu" data-label="QCU"></label>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to={`/creationquestion/${id}/${id_examen}/cree`}>
                <Button variant="outline-dark" size="lg">
                  {" "}
                  Annuler{" "}
                </Button>
              </Link>
              <div style={{ marginLeft: "10px" }}>
                {" "}
                {/* Adjust margin as needed */}
                <Button variant="dark" size="lg" onClick={handleSubmit}>
                  {" "}
                  Enregistrer la question{" "}
                </Button>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <div>Chargement...</div>;
    }
  };

  const QuestionNExistePas = () => {
    const handleSubmit = async () => {
      if (!validerInput()) {
        console.log("il faut que tous les champs soient valides"); //ajouter alerte plus tard
        return;
      }
      try {
        const response = await fetch(
          `${base_url}Ajouter_infos_question/${id_examen}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              titre_q,
              duree_q,
              bareme_q,
              type_q,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        const { id: id_question, type } = data;

        window.location.href = `/infos_reponses/${id_user}/${id_examen}/${id_question}/${type}`;
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
      <div className="big_container">
        <div className="flex_container">
          <div className="temps_container">
            <span>Temps question :</span>
            <Form.Control
              type="text"
              style={{ height: "30px", width: "150px", textAlign: "left" }}
              placeholder={"00:00:00"}
              value={duree_q}
              onChange={handleDureeChange}
            />
          </div>
          <div className="barème_container">
            <span>Barème question :</span>
            <Form.Control
              type="text"
              style={{ height: "30px", width: "150px", textAlign: "left" }}
              placeholder={"points"}
              value={bareme_q}
              onChange={handleBaremeChange}
            />
          </div>
        </div>

        <div className="Question_container">
          <p className="paragraphe">Intitulé de la question :</p>
          <textarea
            style={{ textAlign: "left" }}
            placeholder={"Texte de la question"}
            value={titre_q}
            onChange={handleTitreChange}
          />
        </div>

        <div className="question-type">
          Choisir le type de la question:
          <div className="custom-radio">
            <input
              type="radio"
              id="qcm"
              name="questionType"
              value="QCM"
              onChange={handleTypeChange}
              className="radioB"
            />
            <label htmlFor="qcm" data-label="QCM"></label>
          </div>
          <div className="custom-radio">
            <input
              type="radio"
              id="qcu"
              name="questionType"
              value="QCU"
              className="radioB"
              onChange={handleTypeChange}
            />
            <label htmlFor="qcu" data-label="QCU"></label>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to={`/creationquestion/${id}/${id_examen}/cree`}>
            <Button variant="outline-dark" size="lg">
              {" "}
              Annuler{" "}
            </Button>
          </Link>
          <div style={{ marginLeft: "10px" }}>
            {" "}
            {/* Adjust margin as needed */}
            <Button variant="dark" size="lg" onClick={handleSubmit}>
              {" "}
              Enregistrer la question{" "}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return <div>{id_question ? QuestionExiste() : QuestionNExistePas()}</div>;
};

export default QuestionCrea;
