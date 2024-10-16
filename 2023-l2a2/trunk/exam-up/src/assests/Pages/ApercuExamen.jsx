import React, { useState, useEffect, useRef } from "react";
import HeaderExamine from "../components/HeaderExamine";
import { Container, Button, Spinner } from "react-bootstrap";
import Examen from "../components/Examen";
import "./style/Apercu.css";
import { useParams , Link} from "react-router-dom";
import NavbarProfil from "../components/NavbarProfil";
import { base_url } from "../../baseURL";

const ApercuExamen = () => {
  const { id, id_examen } = useParams();
  const [etat, setEtat] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [examInfos, setExamInfos] = useState("");
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    getinfos();
    getDuree();
  }, []);

  //cherche les infos sur l'examen
  const getinfos = async () => {
    console.log("getinfos est appelé");
    try {
      const response = await fetch(
        `${base_url}examen/${id}/${id_examen}`
      );
      const jasonData = await response.json();
      setExamInfos(jasonData);
      console.log(examInfos);
      getDuree();
    } catch (err) {
      console.error(err.message);
    }
  };

  const getDuree = async () => {
    console.log("getDuree est appelé");
    try {
      const response = await fetch(
        `${base_url}duree_examen/${id}/${id_examen}`
      );
      if (!response.ok) {
        console.log("erreur de chargement de durée");
        return;
      }
      const jasonData = await response.json();
      setTimer(jasonData.total_duration.minutes);
    } catch (err) {
      console.error(err.message);
    }
  };

  //get donnees utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${base_url}utilisateur/${id}`);
        if (!response.ok) {
          throw new Error("Erreur de réseau ou réponse non valide");
        }
        const data = await response.json();
        setNom(data.nom);
        setPrenom(data.prenom);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'utilisateur",
          error
        );
      }
    };
    if (id) {
      fetchUserData();
    }
  }, [id]);

  const urlLogo = `/Profile_examine/${id}`;

  const containertable = {
    width: "100%",
  };

  const hours = Math.floor(timer / 60);
  const minutes = timer % 60;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  //si le timer n'est pas encore initialisé avec getDuree
  if (timer === null) {
    return (
      <div
        style={{
          backgroundColor: "rgba(142, 202, 230, 0.34)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <Spinner animation="border" variant="warning" />
        <div style={{ marginTop: "20px" }}>Chargement de l'examen...</div>
      </div>
    );
  }

  return (
    <div>
      <NavbarProfil nom={nom} prenom={prenom} homePageURL={urlLogo} />

      <div
        style={{
          backgroundColor: "rgba(142, 202, 230, 0.34)",
          minHeight: "100vh",
          padding: "20px 0",
        }}
      >
        <div className="Box">
          <div className="titre_"> Titre : {examInfos.titre}</div> <br />
          <div className="temps_">
            {" "}
            Temps disponible : {hours} heures et {minutes} minutes
          </div>{" "}
          <br />
          <div className="date_">
            {" "}
            Ouvert le : {formatDate(examInfos.date_debut)}{" "}
            jusqu'au {formatDate(examInfos.date_fin)}{" "}
          </div>{" "}
          <br />
          <Link to={`/profile-examinateur/${id}`}>
          <Button variant="dark" size="lg"> retour à l'accueil </Button> <br />
          </Link>
        </div>

        <Container fluid className="contentContainer">
          <div className="Questions">
            <Examen id_examen={id_examen} etat={etat} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ApercuExamen;
