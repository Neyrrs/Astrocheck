import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { jwtDecode } from "jwt-decode";
import "./index.css";
import { Login, Home, Absen, History, ProfileMenu } from "./Pages/UserLevel";
import AdminPanel from "./Pages/AdminLevel/AdminPanel";
import NotFound from "./Pages/NotFound";
// import Exp from "./Exp";

const root = document.getElementById("root");
const token = localStorage.getItem("Token");
const userData = token ? jwtDecode(token) : null;
const role = userData ? userData.role : null;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      {!token ? (
        <Route path="/" element={<Login />} />
      ) :(
        <>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile-menu" element={<ProfileMenu />} />
          <Route path="/Absen" element={<Absen />} />
          {/* <Route path="/exp" element={<Exp />} /> */}
          {role === "admin" && <Route path="/dashboard" element={<AdminPanel />} />}
          <Route path="*" element={<NotFound />} />
        </>
      )
      }
    </Routes>
  </BrowserRouter>
);
