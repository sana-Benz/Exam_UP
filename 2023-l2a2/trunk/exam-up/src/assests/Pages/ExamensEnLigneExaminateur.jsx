import React from 'react';
import { Container  } from "react-bootstrap"; 
import ExamList from "../components/ExamList"; 
import HeaderExaminateur from '../components/HeaderExaminateur';

//edited
const ExamensEnLigneExaminateur = () => {

  return (
    <div className="pageContainer">
       <HeaderExaminateur/>
          <Container fluid className="contentContainer" style={{ backgroundColor: 'rgba(142, 202, 230, 0.34)',
       minHeight: '100vh' , padding: '20px 0' }}>

        {/* liste des examens en ligne*/}
        <ExamList listTitle="Examens en ligne" statut ="en_ligne"/>
      </Container>

    </div>
  );
}

export default ExamensEnLigneExaminateur