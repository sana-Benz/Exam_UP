import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const MenuExaminateur = () => {
  const { id } = useParams(); 
  return (
    <div>
      <Nav variant="underline" justify defaultActiveKey="/" style={{ backgroundColor: '#FFB703' }}>
        <Nav.Item>
          <Nav.Link as={NavLink} to={`/profile-examinateur/${id}`} style={{ color: 'white' }}>Accueil</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to={`/examens-en-ligne/${id}`} style={{ color: 'white' }}>Examens en ligne</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to={`/résultats/${id}`} style={{ color: 'white' }}>Résultats</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default MenuExaminateur;
