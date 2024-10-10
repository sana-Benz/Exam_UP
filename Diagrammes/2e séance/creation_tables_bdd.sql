
CREATE TABLE Etudiant (
    id_etudiant SERIAL NOT NULL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    adresse Mail VARCHAR(100),
    mot de passe VARCHAR(100)
);

CREATE TABLE Enseignant (
    id_enseignant SERIAL NOT NULL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    mot de passe VARCHAR(100)
);

CREATE TABLE Questionnaire (
    id_questionnaire SERIAL NOT NULL PRIMARY KEY,
    titre VARCHAR(200),
    description TEXT,
    temps_debut TIMESTAMP,
    temps_fin TIMESTAMP,
    duree INT,
    nb_questions INT,
    FOREIGN KEY id_enseignant INT REFERENCES Enseignant(id_enseignant)
);

CREATE TABLE Question (
    id_question SERIAL NOT NULL PRIMARY KEY,
    type VARCHAR(20),
    texte_question TEXT
);

CREATE TABLE Complement_question (
    id_complement_question SERIAL NOT NULL PRIMARY KEY,
    chemin_stockage VARCHAR(255),
    type VARCHAR(20)
);

CREATE TABLE Options_de_reponse (
    id_options_de_reponse SERIAL NOT NULL PRIMARY KEY,
    texte_reponse TEXT,
    statut VARCHAR(20),
    note_associee INT,
    FOREIGN KEY id_question INT REFERENCES Question(id_question)
);

CREATE TABLE Questionnaire_personnel (
    numero_questionnaire_personnel SERIAL NOT NULL PRIMARY KEY,
    nb_questions INT,
    etat VARCHAR(20),
    FOREIGN KEY id_questionnaire INT REFERENCES Questionnaire(id_questionnaire),
    FOREIGN KEY id_etudiant INT REFERENCES Etudiant(id_etudiant)
);

CREATE TABLE Reponse_de_l_etudiant (
    id_reponse_de_l_etudiant SERIAL NOT NULL PRIMARY KEY,
    texte TEXT,
    FOREIGN KEY id_etudiant INT REFERENCES Etudiant(id_etudiant),
    FOREIGN KEY id_question INT REFERENCES Question(id_question), 
    numero_questionnaire_personnel INT,
    id_questionnaire INT,
    FOREIGN KEY (numero_questionnaire_personnel, id_questionnaire)
        REFERENCES Questionnaire_personnel(numero_questionnaire_personnel, id_questionnaire)
);

CREATE TABLE Porter_sur (
    FOREIGN KEY id_complement_question INT REFERENCES Complement_question(id_complement_question),
    FOREIGN KEY id_question INT REFERENCES Question(id_question),
    PRIMARY KEY (id_complement_question, id_question)
);

CREATE TABLE Contenir (
    FOREIGN KEY id_question INT REFERENCES Question(id_question),
    FOREIGN KEY id_questionnaire INT REFERENCES Questionnaire(id_questionnaire),
    nb_points INT,
    ordre INT,
    PRIMARY KEY (id_question, id_questionnaire)
);

CREATE TABLE Corriger (
    FOREIGN KEY id_enseignant INT REFERENCES Enseignant(id_enseignant),
    numero_questionnaire_personnel INT,
    FOREIGN KEY id_questionnaire INT REFERENCES Questionnaire(id_questionnaire),
    PRIMARY KEY (numero_questionnaire_personnel, id_questionnaire), //à revoir
    FOREIGN KEY (numero_questionnaire_personnel, id_questionnaire)
        REFERENCES Questionnaire_personnel(numero_questionnaire_personnel, id_questionnaire)
);