import React, {useState, useEffect} from 'react'
import {Container  } from "react-bootstrap"; 
import ExamCard from '../components/ExamCard'
import { Link, useParams } from 'react-router-dom';
import HeaderExamine from "../components/HeaderExamine"
import { base_url } from "../../baseURL";



const HomeExamine = () => {
  const { id } = useParams();
  const [examCardsExamine, setExamCardsExamine] = useState([]);
  let  listTitle="Liste des examens ";

    //fonction qui va chercher en bdd la liste d'examen que l'utilisateur a été invité pour les passer
    const getExamineExams = async () => {
        try {
        const response = await fetch(`${base_url}Invitations_examens/${id}`);
        const jasonData = await response.json(); 
        setExamCardsExamine(jasonData);
        } catch (err) {
        console.error(err.message);
        }
    };
    useEffect(() => {
        getExamineExams(); 
    }, []); 

    return (
      <div>
        <HeaderExamine/>
        <Container fluid className="contentContainer" style={{ backgroundColor: 'rgba(142, 202, 230, 0.34)', minHeight: '100vh', padding: '20px 0' }}>
          <div className="examListContainer">
            <div className="titleContainer">
              <h1 className="listTitle">{listTitle} :</h1>
            </div>
            <div className="cardsContainer">
              {examCardsExamine.length > 0 ? (
                examCardsExamine.map((exam) => (
                  <Link key={exam.id} to={`/Instructions_examen/${id}/${exam.id}`} className="examCardLink" style={{ textDecoration: 'none' }}> 
                    <React.Fragment key={exam.id}>
                      <ExamCard
                        titre={exam.titre}
                        className="card"
                        titleStyle="cardTitle"
                      />
                    </React.Fragment>
                  </Link>
                ))
              ) : (
                <p>Pas encore d'examens à venir.</p>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
    
}

export default HomeExamine
