import Footer from "./layout/Footer";
import "./index.css";
import Home from "./layout/Home";
import Signup from "./pages/auth/Signup";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Header from "@/components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
