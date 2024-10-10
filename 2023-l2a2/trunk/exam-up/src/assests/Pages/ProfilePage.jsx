import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";


// ici j'ai choisi de garder tous les champs disabled pour éviter la triche par exemple mais à revoir
//composant réutilisable

const ProfilePage = ({header}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className="pageContainer">
      {header}

      <Container
        fluid
        className="contentContainer"
        style={{
          backgroundColor: "rgba(142, 202, 230, 0.34)",
          minHeight: "100vh",
          padding: "20px 0",
        }}
      >
        <h2>Informations personnelles :</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Prénom:</Form.Label>
            <Form.Control type="text" value="Alain" disabled />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Nom:</Form.Label>
            <Form.Control type="text" value="Dupont" disabled />
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Rôle:</Form.Label>
            <Form.Control type="text" value="Examinateur" disabled />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value="Alain@example.com" disabled />
          </Form.Group>

          <Form.Group controlId="oldPassword">
            <Form.Label>Mot de passe actuel:</Form.Label>
            <Form.Control
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label>Nouveau mot de passe:</Form.Label>
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" style={{ marginBottom: '20px' }}>
            <Form.Label>Confirmer mot de passe:</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="warning" type="submit">
            Confirmer
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ProfilePage;
