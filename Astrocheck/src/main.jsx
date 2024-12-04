import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Home from "./Pages/Home";
import History from "./Pages/History";
import ProfileMenu from "./Pages/ProfileMenu";
import Login from "./Pages/Login";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile-menu" element={<ProfileMenu />} />
    </Routes>
  </BrowserRouter>
);
