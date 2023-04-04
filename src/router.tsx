import { Routes, Route } from "react-router-dom";

import Home  from "./pages/Home"
import NotFound from './pages/404'

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/other" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};