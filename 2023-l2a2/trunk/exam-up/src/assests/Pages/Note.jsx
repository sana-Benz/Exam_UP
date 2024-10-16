import React, {useState, useEffect} from 'react'
import {Container  } from "react-bootstrap"; 
import ExamCard from '../components/ExamCard'
import { Link, useParams } from 'react-router-dom';
import HeaderExamine from "../components/HeaderExamine"
import "./style/Note.css";
import { base_url } from "../../baseURL";


const Note = () => {
    const { id,id_examen } = useParams();
    const [noteExamen, setNoteExamen] = useState(0);
    const [titre, setTitre]= useState('');

    useEffect(() => {
        getNote();
        getTitre();
    }, []); 

    const getNote = async () => {
        try {
        const response = await fetch(`${base_url}ma_note/${id}/${id_examen}`);
        const jasonData = await response.json(); 
        setNoteExamen(jasonData);
        } catch (err) {
        console.error(err.message);
        }
    };

   const getTitre = async () => {
    try {
    const response = await fetch(`${base_url}examen/${id}/${id_examen}`);
    const jasonData = await response.json(); 
    setTitre(jasonData.titre);
    } catch (err) {
    console.error(err.message);
    }
   };

   const determineMention = (note) => {
    if (note >= 16) {
        return "Très bien";
    } else if (note >= 14) {
        return "Bien";
    } else if (note >= 12) {
        return "Assez bien";
    } else {
        return "A améliorer";
    }
};
  return (
    <div>
        <HeaderExamine/>
      <Container fluid className="contentContainer" style={{ backgroundColor: 'rgba(142, 202, 230, 0.34)', minHeight: '100vh', padding: '20px 0' }}>
        <div className='box'>
      <div className='titre-examen'>Votre note pour l'examen  : {titre}</div> 

      <div className='note-examen'> est {noteExamen}/20 .</div>

      <div className='mention'> Mention : {determineMention(noteExamen)} </div>
      </div>         

      </Container>
      
    </div>
  )
}

export default Note
