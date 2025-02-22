import React, {useState, useEffect} from 'react'
import ExamCard from './ExamCard'
import '../Pages/style/ExamList.css';
import { Link, useParams } from 'react-router-dom';
import { base_url } from "../../baseURL";

// modifié 
// prends en argument une liste d'exam cards et le titre de la liste, si on ajoute des examens seule la longueur varie

const ExamList = ({ listTitle, statut}) => {
  const [examCards, setExamCards] = useState([]);
  const { id }= useParams(); 
  //fonction qui va chercher en bdd la liste d'examen de l'utilisateur avec le statut spécifié
  const getExams = async () => {
    try {
      const response = await fetch(`${base_url}examens/${id}/${statut}`);
      const jasonData = await response.json(); //parse data
      setExamCards(jasonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getExams(); 
  }, []); 


  return (
    <div className="examListContainer">
      <div className="titleContainer">
        <h1 className="listTitle">{listTitle} :</h1>
      </div>

      <div className="cardsContainer">
      {examCards.map((exam) => (
          <Link key={exam.id} to={`/Détails-examen/${id}/${exam.id}/${statut}`} className="examCardLink" style={{ textDecoration: 'none' }}>
            <ExamCard
              titre={exam.titre}
              statut={statut}
              className="card"
              titleStyle="cardTitle"
            />
          </Link>
        ))}
      </div>
    </div>
  );
  };
  
  export default ExamList;