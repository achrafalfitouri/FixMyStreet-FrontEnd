import {  Route, Routes } from "react-router-dom";

import HomePage from "../Pages/HomePage";



function AppRoutes() {

  return (
    
  
      <Routes>
        <Route path="/" element={<HomePage />} />
       
    
        
      </Routes>
     
  );
}
export default AppRoutes;