import React, { useState , useEffect} from "react";
import {Table, Button, Stack} from "react-bootstrap";
import { base_url } from "../../baseURL";

const AddParticipant = ({id,id_examen,ParticipantsList}) => {
  const [IdExamine, setIdExamine] = useState("");
  const[groupeParticipants, setGroupeParticipants ] = useState([]);
  const[groupe, setGroupe]=useState('');

  //fonction qui va chercher les participants avec le groupe précisé
  const getGroupeParticipants = async (groupe) => {
    try {
      console.log("je suis avant le respsnjnrf");
      const response = await fetch(`${base_url}groupe_participants/${id}/${id_examen}/${groupe}`);
      const jasonData = await response.json(); 
      setGroupeParticipants(jasonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getGroupeParticipants(); 
  }, [groupe]);



  const onAjoutParticipant = async (id_examen, id) => {
    try {
      const body = { id_examine: IdExamine };
      const response = await fetch(
        `${base_url}participants/${id}/${id_examen}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body), 
        }
      );
      window.location = `/Liste_Participants/${id}/${id_examen}`;
    } catch (err) {
      console.error(err.message);
    }
  };

  const ajouterGroupe = async (groupe) => {
    if (ParticipantsList.some(participant => participant.groupe === groupe)) {
      alert("Des participants de ce groupe ont déjà été ajoutés.");
      return;
  }
    try {
      const response = await fetch(
        `${base_url}ajouter_groupe_participants/${id}/${id_examen}/${groupe}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      window.location = `/Liste_Participants/${id}/${id_examen}`;
    } catch (err) {
      console.error(err.message);
    }
  };


  

  return (
  <div className="container">
    
    <Stack gap={3}>
      <div>
      <h1 className="text-center mt-5 p-2" style={{
        color: "#000000",
        fontFamily: "Montserrat",
        fontWeight: "bold",
      }}>
        Chercher le groupe des participants:
      </h1>
      <form className="mt-3 mb-3 p-2">
        <input
          type="text"
          className="form-control d-inline-block"
          value={groupe}
          onChange={(e) => setGroupe(e.target.value)}

        />
        <div>
        <button type="button" className="btn btn-info d-inline-block ml-2 p-2" onClick={() => getGroupeParticipants(groupe)}>
          Chercher
        </button> {'  '}
        <button type="button" className="btn btn-dark d-inline-block ml-2 p-2" onClick={() => ajouterGroupe(groupe)}>
          Ajouter le groupe
        </button>
        </div>
        
      </form>
      </div>

      <div>
      <Table striped bordered hover className="mt-3 p-2" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Id examiné</th>
            <th>Nom</th>
            <th>Prénom</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(groupeParticipants) && groupeParticipants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.id}</td>
              <td>{participant.nom}</td>
              <td>{participant.prenom}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
      </Stack>
    </div>

  );
};

export default AddParticipant;
