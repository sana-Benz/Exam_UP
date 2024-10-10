import React from 'react';
import Timer from "../images/Timer.svg";
import Settings from "../images/Settings.svg";
import save from "../images/save.svg";
import flexible from "../images/flexible.svg";
import graphe from "../images/graphe.svg";


 
const Fonctionalites = () => {

    const textStyle = {
        fontFamily: 'Montserrat, sans-serif',
        margin: '0 0 20px',
        color: '#023047',
      };
    
    const imageStyle1 = {
        background: '#fff3e5',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: '0',
        position: 'relative',

      };

      const imageStyle2 = {
        background: '#e9f5f8',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: '0',
        position: 'relative',

      };

      const cardStyle = {
        background: '#ffffff',
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        flex: 1,
        position: 'relative',
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',
      };
      const cardStyle1 = {
        background: '#ffffff',
        borderRadius: '24px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        position: 'relative',
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)',
        overflow: 'hidden',

      };



      const cardColections = {
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexShrink: 0,
        position: 'relative',
      };

      const cardColections1 = {
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        flexShrink: 0,
        position: 'relative',
      };

      const nosFonctionalites = {
        padding: '20px 80px 80px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      };
    
      const rectangle = {
        background: '#023047',
        borderRadius: '80px',
        flexShrink: 0,
        width: '88px',
        height: '8px',
        position: 'relative',

      };

      const title = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
      };


    return(

        <div style={nosFonctionalites}>
            <div style={title}>
            <div style={rectangle}></div>
            <h2 style={textStyle}>Nos fonctionalités</h2>
            </div>
            

            <div style={cardColections}>
                <div style={cardStyle}>
                    <div style={imageStyle1}>
                        <img src={Timer} alt="timer" />
                    </div>
                    <div>
                        <h2 style={textStyle}>Chronométrage des QUIZ</h2>
                        <p style={textStyle}>Maîtrisez le temps avec facilité. Configurez un chronomètre pour chaque quiz, augmentant engagement et concentration</p>
                    </div>
                </div>

                <div style={cardStyle}>
                    <div style={imageStyle2}>
                        <img src={Settings} alt="settings" />
                    </div>
                    <div>
                        <h2 style={textStyle}>Automatisation</h2>
                        <p style={textStyle}>Corrections instantanées, effort minimal. Automatisez la correction des quiz pour une efficacité maximale.</p>
                    </div>
                </div>

                <div style={cardStyle}>
                    <div style={imageStyle1}>
                        <img src={save} alt="save" />
                    </div>
                    <div>
                        <h2 style={textStyle}>Banque de Questions et Historique</h2>
                        <p style={textStyle}>Sauvegardez vos questions et accédez à l'historique de vos quiz en un instant. Créez une banque de connaissances personnalisée</p>
                    </div>
                </div>
    
            </div>

            <div style={cardColections1}>

                <div style={cardStyle1}>
                    <div style={imageStyle2}>
                        <img src={flexible} alt="flexible" />
                    </div>
                    <div>
                        <h2 style={textStyle}>Types de Questions Flexibles</h2>
                        <p style={textStyle}>Créez des quiz dynamiques en toute simplicité. Insérez des images, du texte, des QCM et des cases à cocher pour personnaliser vos évaluations comme jamais auparavant.</p>
                    </div>
                </div>

                <div style={cardStyle1}>
                    <div style={imageStyle1}>
                        <img src={graphe} alt="graphe" />
                    </div>
                    <div>
                        <h2 style={textStyle}>Évaluation des Performances</h2>
                        <p style={textStyle}>Visualisez le progrès en un clin d'œil. Nos évaluations basées sur les réponses offrent un aperçu précis des performances.</p>
                    </div>
                </div>

            </div>


        </div>



     );

};

export default Fonctionalites;