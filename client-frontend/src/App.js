
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import DairyProducts from "./pages/DairyProducts";
import Dashboard from "./Dashboard";
import TemplatePage from "./pages/TemplatePage"
import EditOrderTemp from "./pages/EditOrderTemp"
const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/landing-page" element={<LandingPage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard/>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/template" element={<TemplatePage/>}/>
          <Route path="/productgrid/:slug" element={<DairyProducts/>}/>
          {/* <Route path=""/> */}
         <Route path="/home/:templateId" element={<EditOrderTemp/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
