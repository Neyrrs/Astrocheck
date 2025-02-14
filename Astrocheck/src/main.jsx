import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import { Login, Home, Absen, History, ProfileMenu } from "./Pages/UserLevel";
import Exp from "./Exp";
import AdminPanel from "./Pages/AdminLevel/AdminPanel";
import NotFound from "./Pages/NotFound";
const root = document.getElementById("root");

const token = localStorage.getItem("Token");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile-menu" element={<ProfileMenu />} />
          <Route path="/Absen" element={<Absen />} />
          <Route path="/exp" element={<Exp />} />
          <Route path="/Dashboard" element={<AdminPanel />} />
        </>
      ) : (
        <Route path="/" element={<Login />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
