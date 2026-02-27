import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Stats from "./pages/Stats";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}