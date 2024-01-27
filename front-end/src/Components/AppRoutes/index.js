import {  Route, Routes } from "react-router-dom";

import HomePage from "../Pages/HomePage";
import Formulaire from "../Pages/Formulaire";



function AppRoutes() {

  return (
    
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/formulaire" element={<Formulaire />} />
       
    
        
      </Routes>
     
  );
}
export default AppRoutes;