import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import "./index.css";
import { Login, Home, Absen, History, ProfileMenu } from "./Pages/UserLevel";
import Exp from "./Exp";
import AdminPanel from "./Pages/AdminLevel/AdminPanel";
import NotFound from "./Pages/NotFound";

const root = document.getElementById("root");
const token = localStorage.getItem("Token");
const userData = token ? jwtDecode(token) : null;
const role = userData ? userData.role : null;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      {!token ? (
        <Route path="/" element={<Login />} />
      ) : role === "admin" ? (
        <>
          <Route path="/dashboard" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile-menu" element={<ProfileMenu />} />
          <Route path="/Absen" element={<Absen />} />
          <Route path="/exp" element={<Exp />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  </BrowserRouter>
);
