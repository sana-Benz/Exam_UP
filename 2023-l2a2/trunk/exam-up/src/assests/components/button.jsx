import React, { useState } from 'react';


const Button = ({
  text,          //saisir le texte que doit contenir le button
  fontSize = '20px',    //la taille de texte,par deafut c'est 20 px , peut etre changé
  fontFamily = 'Montserrat',   //la police de text
  fontWeight = 'bold',  
  color,     //la couleur de button
  textColor,   //la couleur de texte
  hoverColor = 'transparent',    //la couleur de button quand on le survol avec la souris (on hover)
  hoverTextColor,         //la couleur de texte quand on le survol avec la souris (on hover)
  hoverBorderColor,         //la couleur de la bordure de  button quand on le survol avec la souris (on hover)
  width = '200px',     //la taille de button, par défuat c'est 200 px
  style,      //pour ajoutez des style en plus au button
  hoverStyle,   //pour rajoutez des style en plus au button quand on le survole
  ...props    
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const defaultStyle = {
    display: 'inline-flex', // Pour le centrage vertical et horizontal
    justifyContent: 'center', // Centrage horizontal avec flexbox
    alignItems: 'center', // Centrage vertical avec flexbox
    width,
    padding: '10px 20px',
    backgroundColor: color,
    border: `2px solid ${textColor}`,
    borderColor: 'inherit',
    borderRadius: '20px',
    color: textColor,
    fontSize,
    fontFamily,
    fontWeight,
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.3s ease',
    ...style,
  };

  const defaultHoverStyle = {
    backgroundColor: hoverColor,
    color: hoverTextColor,
    borderColor: hoverBorderColor,
    ...hoverStyle,
  };

  return (
    <button
      style={{ ...defaultStyle, ...(isHovered ? defaultHoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
