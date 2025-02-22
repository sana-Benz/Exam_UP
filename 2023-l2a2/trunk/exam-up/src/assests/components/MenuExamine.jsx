import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const MenuExamine = () => {
  const { id } = useParams(); 
  return (
    <div>
      <Nav variant="underline" justify defaultActiveKey={`/Profile_examine/${id}`} style={{ backgroundColor: '#FFB703' }}>
        <Nav.Item>
          <Nav.Link as={NavLink} to={`/Profile_examine/${id}`} style={{ color: 'white' }}> Accueil </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to={`/Mes_résultats_d'examen/${id}`} style={{ color: 'white' }}>Résultats d'examens</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default MenuExamine;
