import React from "react";
import Card from "react-bootstrap/Card";
import "../Pages/style/ExamCard.css";

import exam from "../images/exam.svg";

//modifié examName -> titre et ajouté id ...
// carte d'examen prends en argument le nom de l'examen et son id
//quand on clique dessus on est ramené vers la page détails examen

const ExamCard = ({ titre}) => {
  return (
     
    <Card
      border="secondary"
      className="ExamCard"
      //onClick={() => console.log(ExamCard.titre ,ExamCard.id)}
      
    >
      <Card.Body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={exam}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="logo du site"
            style={{ marginRight: "20px", verticalAlign: "middle" }}
          />
          <Card.Title className="cardTitle">{titre}</Card.Title>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ExamCard;

