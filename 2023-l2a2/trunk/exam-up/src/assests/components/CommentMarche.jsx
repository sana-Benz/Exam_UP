import React from 'react';

const CommentMarche = () => {
    const textStyle = {
        fontFamily: 'Montserrat, sans-serif',
        margin: '0 0 20px',
        color: '#023047',
        wordWrap: 'break-word',
    };

    const number = {
        fontFamily: 'Montserrat, sans-serif',
        color: 'white',
        margin:'0rem',
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

    const rectangle = {
        background: '#023047',
        borderRadius: '80px',
        flexShrink: 0,
        width: '88px',
        height: '8px',
        position: 'relative',

      };
     const cercle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',  
        height: '50px', 
        backgroundColor: '#FFA500',
        borderRadius: '50%',
        fontSize: '20px',
        fontWeight: 'bold',
        position:'absolute',
        left:'14px',
        zIndex: '2',
     };

     const cercle1 = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',  
        height: '50px', 
        backgroundColor: '#219EBC',
        borderRadius: '50%',
        fontSize: '20px',
        fontWeight: 'bold',
        position:'absolute',
        left:'14px',
        zIndex: '2',
     };
    
     const cadre = {
        marginLeft: '44px',
        background: 'rgba(255, 183, 3, 0.1)',
        borderRadius: '24px',
        borderStyle: 'dashed',
        borderColor: '#ffb703',
        borderWidth: '4px',
        padding: '44px 72px 44px 72px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        position: 'relative',
        padding: '20px',
        width: '900px',
     };

     const cadre1 = {
        marginLeft: '44px',
        background: 'rgba(33, 158, 188, 0.1)',
        borderRadius: '24px',
        borderStyle: 'dashed',
        borderColor: '#219ebc',
        borderWidth: '4px',
        padding: '44px 72px 44px 72px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        padding: '20px',
        width: '900px',
     };

    const step = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        with:'1308px',
    };

    const allSteps = {
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
        alignSelf: 'stretch',
    };

    const howItWork = {
        padding: '0px 80px 80px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: '56px',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',

    };


return(
    <div style={howItWork}>
        <div style={title}>
        <div style={rectangle}></div>
        <h2 style={textStyle}>Comment ça marche ?</h2>
        </div>

        <div  style={allSteps}>

            <div style={step}>
                <div style={cercle}><p style={number}>1</p></div>
                <div style={cadre}>
                    <h3 style={textStyle}>Ajout de Quiz</h3>
                    <p style={textStyle}>Initiez votre expérience en appuyant sur le bouton "Ajouter un Quiz". C'est le point de départ<br/>pour créer des évaluations sur mesure.</p>
                </div>
            </div>

            <div style={step}>
                <div style={cercle1}><p style={number}>2</p></div>
                <div style={cadre1}>
                    <h3 style={textStyle}>Choix du Mode de Quiz</h3>
                    <p style={textStyle}>Sélectionnez entre le mode de correction automatique avec des QCM ou le mode de correction<br />manuelle. Adaptez votre quiz selon vos préférences</p>
                </div>
            </div>

            <div style={step}>
                <div style={cercle}><p style={number}>3</p></div>
                <div  style={cadre}>
                    <h3 style={textStyle}>Ajout de Question</h3>
                    <p style={textStyle}>Créez et personnalisez votre question : ajoutez photos, sons, vidéos, définissez le nombre de<br />points et précisez la méthode de réponse (case à cocher ou saisie de texte). </p>
                </div>
            </div>

            <div style={step}>
                <div style={cercle1}><p style={number}>4</p></div>
                <div style={cadre1}>
                    <h3 style={textStyle}>Répétez le Processus</h3>
                    <p style={textStyle}>Continuez à concevoir votre quiz en répétant le processus. Ajoutez autant de questions que<br />nécessaire pour créer un quiz complet et engageant.</p>
                </div>
            </div>

            <div style={step}>
                <div style={cercle}><p style={number}>5</p></div>
                <div style={cadre}>
                    <h3 style={textStyle}>Partage du Quiz</h3>
                    <p style={textStyle}>Une fois votre quiz finalisé, partagez le lien avec vos participants. Invitez-les à passer<br />l'examen en un clic pour une expérience fluide et accessible</p>
                </div>
            </div>

            <div style={step}>
                <div style={cercle1}><p style={number}>6</p></div>
                <div style={cadre1}>
                    <h3 style={textStyle}>Analyse des Résultats</h3>
                    <p style={textStyle}>Analysez les résultats et téléchargez les statistiques du quiz. Évaluez les performances pour<br />améliorer les futures sessions et personnaliser l'apprentissage</p>
                </div>
            </div>

        </div>

    </div>
  );
};

export default CommentMarche;