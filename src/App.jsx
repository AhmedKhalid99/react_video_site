import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Import the Header component
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Header /> {/* Header will be shown on all pages */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
