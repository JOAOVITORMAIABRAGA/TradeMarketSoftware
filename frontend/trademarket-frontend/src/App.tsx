import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AssetDetails from "./pages/AssetDetails";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/asset/:symbol" element={<AssetDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
