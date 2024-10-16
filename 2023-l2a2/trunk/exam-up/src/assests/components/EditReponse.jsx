import React, { useEffect, useState } from "react";
import "../Pages/style/ReponseCreation.css";
import { Form, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import ModalComponent from "./ModalComponent";
import { base_url } from "../../baseURL";

const EditReponse = ({ id_rep }) => {
  const [rep, setRep] = useState(null); //1 seule option de rép
  const [titre_O, setTitre_O] = useState("");
  const [valeur_O, setvaleur_O] = useState("false");

  const handleSelectChange = (e) => {
    setvaleur_O(e.target.value);
  };

  //renvoie le texte et vf d'une option de rép à partir de son id
  const getReponse = async (id_rep) => {
    try {
      const response = await fetch(
        `${base_url}option_reponse/${id_rep}`
      );
      const responseData = await response.json();
      setRep(responseData);
      setTitre_O(responseData.texte);
      setvaleur_O(responseData.vf.toString());
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getReponse(id_rep);
  }, [id_rep]);

  //mettre à jour une option de réponse
  const handleConfirm = async () => {
    try {
        const body = {
            titre_O,
            valeur_O 
          };
      const response = await fetch(
        `${base_url}Mettre_a_jour_reponse/${id_rep}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body)
        }
      );
      window.location.reload(); 
      console.log("réponse mise à jour avec succés");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ModalComponent
      modalTitle="Modifier option de réponse"
      buttonTitle="Modifier"
      buttonStyle="warning"
      closeText="Abandonner"
      confirmText="confirmer"
      handleConfirm={handleConfirm}
      modalBody={
        <Form >
            
          <Form.Control
            type="text"
            className="form-control mb-3"
            value={titre_O}
            onChange={(e) => setTitre_O(e.target.value)}
          />
            
          <Form.Select
            aria-label="Default select example"
            onChange={handleSelectChange}
            value={valeur_O}
          >
            <option value="true">Correcte</option>
            <option value="false">Incorrecte</option>
          </Form.Select>
        </Form>
      }
      
    />
  );
};

export default EditReponse;
