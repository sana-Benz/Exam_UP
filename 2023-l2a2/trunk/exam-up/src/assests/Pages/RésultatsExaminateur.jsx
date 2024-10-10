import React from "react";
import { Container } from "react-bootstrap";
import "./style/buttons.css"
import ExamList from "../components/ExamList";
import HeaderExaminateur from "../components/HeaderExaminateur";

const RésultatsExaminateur = () => {
  
  return (
    <div className="pageContainer">
      <HeaderExaminateur/>

      <Container
        fluid
        className="contentContainer"
        style={{
          backgroundColor: "rgba(142, 202, 230, 0.34)",
          minHeight: "100vh",  padding: '20px 0' 
        }}
      >

        <ExamList listTitle="Examens corrigés" statut="corrige" />
  
      </Container>
    </div>
  );
};

export default RésultatsExaminateur;