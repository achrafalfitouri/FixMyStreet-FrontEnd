import {  Route, Routes } from "react-router-dom";

import HomePage from "../Pages/HomePage";
import Formulaire from "../Pages/Formulaire";
import SuiviReclamation from "../Pages/SuiviReclamation";



function AppRoutes() {

  return (
    
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path="/suivi-reclamation" element={<SuiviReclamation />} />
       
    
        
      </Routes>
     
  );
}
export default AppRoutes;