import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Bookings from "./pages/Bookings.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route
            path="*"
            element={
              <div className="not-found fade-in">
                <h1>404</h1>
                <p>That page doesn't exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
