import React, {useState, useEffect} from 'react'
import HeaderExamine from "../components/HeaderExamine"
import ExamCard from '../components/ExamCard'
import { Link, useParams } from 'react-router-dom';
import {Container  } from "react-bootstrap"; 
import { Form, Table, Button } from "react-bootstrap";
import { base_url } from "../../baseURL";

const RésultatsExamine = () => {
  const { id } = useParams();
  const [mes_examens_corriges, setMes_examens_corriges] = useState([]);
  const listTitle = "Examens corrigés";

  useEffect(() => {
    getExams();
  }, []);

  const getExams = async () => {
    try {
      const response = await fetch(`${base_url}mes_examens_corriges/${id}`);
      const jsonData = await response.json();
      setMes_examens_corriges(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <HeaderExamine/>
      <Container fluid className="contentContainer" style={{ backgroundColor: 'rgba(142, 202, 230, 0.34)', minHeight: '100vh', padding: '20px 0' }}>
        <div className="examListContainer">
          <div className="titleContainer">
            <h1 className="listTitle">{listTitle} :</h1>
          </div>
          <div className="cardsContainer">
            {mes_examens_corriges.length > 0 ? (
              mes_examens_corriges.map((exam) => (
                <Link key={exam.id} to={`/Ma_note/${id}/${exam.id}`} style={{ textDecoration: 'none' }}> 
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
              <p>Pas encore d'examens corrigés.</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RésultatsExamine;
