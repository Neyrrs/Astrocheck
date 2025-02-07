import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Home from "./Pages/Home";
import History from "./Pages/History";
import ProfileMenu from "./Pages/ProfileMenu";
import Login from "./Pages/Login";
import Absen from "./Pages/Absen";
import Exp from "./Exp";
import AdminPanel from "./Pages/AdminLevel/AdminPanel";

const root = document.getElementById("root");
const token = localStorage.getItem("Token");   
console.log(token);

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      {token && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile-menu" element={<ProfileMenu />} />
          <Route path="/Absen" element={<Absen />} />
          <Route path="/exp" element={<Exp />} />
          <Route path="/Dashboard" element={<AdminPanel />} />
        </>
      )}
    </Routes>
  </BrowserRouter>
);
