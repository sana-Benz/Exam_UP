import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//modifie
function ModalComponent({
  modalTitle, //titre du modal
  buttonTitle, //titre du bouton qui déclenche le modal
  buttonStyle, // variant du bouton bootstrap = couleur, style etc..
  buttonSize, //accepte les valeurs "sm" = petit, "lg" = large et undefined = taille par défaut
  modalBody, //ce qu'il y a à l'intérieur du modal texte, form ..
  closeText, //texte du bouton fermer, annuler etc..
  confirmText, //texte du bouton confirmer..
  handleConfirm,

}) {
  const [show, setShow] = useState(false);

  
  const handleShow = () => setShow(true);
  
  const closeModal = () => {
    setShow(false); 
    
  };
  

  return (
    <>
      <Button variant={buttonStyle} size={buttonSize} onClick={handleShow}>
        {buttonTitle}
      </Button>

      <Modal
        show={show}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{modalBody}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            {closeText}
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;