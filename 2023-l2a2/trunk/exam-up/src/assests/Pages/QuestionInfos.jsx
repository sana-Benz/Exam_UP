import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarProfil from "../components/NavbarProfil";
import {Container } from "react-bootstrap";
import QuestionCrea from "../components/QuestionCrea";

// ici c'est la page pour pouvoir indiquer les informations sur les réponses et questions d'examen
const QuestionInfos = () => {
    const { id , id_examen,id_question}= useParams(); 


  return (
    <div>
      
        <Container fluid className="contentContainer" style={{ backgroundColor: 'rgba(142, 202, 230, 0.34)', 
        minHeight: '100vh' , padding: '20px 0' }}>
            <QuestionCrea/>
        </Container>
    </div>
  )
}

export default QuestionInfos
