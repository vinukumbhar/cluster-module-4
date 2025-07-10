import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import GroupByPackagingType from "./pages/ProductGrid"
import MainGrid from "./components/MainGrid"
import BekaryProducts from "./pages/BakeryProducts"
import DairyProducts from "./pages/DairyProcucts"
import NamakinProducts from "./pages/NamakinProducts"
import CakesProducts from "./pages/CakesProducts"
import BiscuitsProducts from "./pages/BiscuitsProducts"
import LadduProducts from "./pages/LadduProducts"
import ProductDetails from './pages/productDetails';

const App = () => {
  return (
   <>
   <BrowserRouter >
        <Routes>
           <Route path="/productgrid" element={<GroupByPackagingType/>}/>
          <Route path="/" element={<Dashboard />}>
          <Route path="/insights" element={<MainGrid />} />  
            <Route path="/bakery-products" element={<BekaryProducts/>}/>
               <Route path="/dairy-products" element={<DairyProducts/>}/>
               <Route path="/namakin-products" element={<NamakinProducts/>}/>
               <Route path="/cskes-products" element={<CakesProducts/>}/>
               <Route path="/biscuits-products" element={<BiscuitsProducts/>}/>
             <Route path="/laddu-products" element={<LadduProducts/>}/>
             <Route path='/productdetails/:_id' element={<ProductDetails/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
   </>
  )
}

export default App