import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import PrivateRoute from './assests/components/PrivateRoute';

import SignupPage from './assests/Pages/SignupPage';
import LoginPage from './assests/Pages/LoginPage';
import ErrorPage from './assests/Pages/ErrorPage';
import AcceuilPage from './assests/Pages/AcceuilPage';

import HomeExaminateur from "./assests/Pages/HomeExaminateur"
import ExamensEnLigneExaminateur from "./assests/Pages/ExamensEnLigneExaminateur";
import RésultatsExaminateur from "./assests/Pages/RésultatsExaminateur";
import ProfilePage from './assests/Pages/ProfilePage';
import HeaderExaminateur from './assests/components/HeaderExaminateur';
import CreationQuestion from './assests/Pages/CreationQuestion';
import ExamDetails from './assests/Pages/ExamDetails';
import ParticipantsList from './assests/Pages/ParticipantsList';
import QuestionInfos from './assests/Pages/QuestionInfos';
import ReponsesInfos from './assests/Pages/ReponsesInfos';
import ApercuExamen from './assests/Pages/ApercuExamen';
import Results from './assests/Pages/Results';


import HomeExamine from "./assests/Pages/HomeExamine";
import RésultatsExamine from "./assests/Pages/RésultatsExamine";
import Instructions from './assests/Pages/Instructions';
import ExamPage from './assests/Pages/ExamPage';
import HeaderExamine from './assests/components/HeaderExamine';
import Note from './assests/Pages/Note';




const App = () => {


  return (

  <AuthProvider>
   <BrowserRouter>

      <Routes>
      {/* Routes publiques */}
      <Route path="/" index element={<AcceuilPage/>} />
      <Route path="/LogIn"  element={<LoginPage/>} />
      <Route path="/SignUp" element={<SignupPage/>} />
      <Route  path="*" element={<ErrorPage/>} />


      {/* Routes Examinateur */}
      <Route path="/profile-examinateur/:id" element={<PrivateRoute component={HomeExaminateur} roleRequired="examinateur"/>} />
      <Route path="/résultats/:id" element={<RésultatsExaminateur />} />
      <Route path="/examens-en-ligne/:id" element={<ExamensEnLigneExaminateur />} />
      <Route path="/ProfilePage/:id" element={<ProfilePage header={<HeaderExaminateur/>} />} />   
      <Route path="/Détails-examen/:id/:id_examen/:statut" element={<ExamDetails/>} />   
      <Route path="/Liste_Participants/:id/:id_examen" element={<ParticipantsList />} /> 
      <Route path="/creationquestion/:id/:id_examen/:statut" element={<CreationQuestion/>} />
      <Route path="/ajouter_question/:id/:id_examen" element={<QuestionInfos />} /> 
      <Route path="/modifier_question/:id/:id_examen/:id_question" element={<QuestionInfos />} /> 
      <Route path="/infos_reponses/:id/:id_examen/:id_question/:type_q" element={<ReponsesInfos />} /> 
      <Route path="/aperçu_examen/:id/:id_examen" element={<ApercuExamen />} /> 
      <Route path="/Results/:id/:id_examen" element={<Results/>}/>

      {/* Routes Examine */}
      <Route path="/Profile_examine/:id" element={<PrivateRoute component={HomeExamine} roleRequired="examine"/>} />
      <Route path="/Mes_résultats_d'examen/:id" element={<RésultatsExamine />} />
      <Route path="/Instructions_examen/:id/:id_examen" element={<Instructions/>} />
      <Route path="/Examen/:id/:id_examen" element={<ExamPage/>} />
      <Route path="/Ma_note/:id/:id_examen" element={<Note/>} />
      <Route path="/ProfilePage/:id" element={<ProfilePage header={<HeaderExamine/>} />} /> 


      
     </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
  
};



export default App;