import { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Navbarlogin from "./components/Navbarlogin";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Changepass from "./components/Changepass";
import Searchproducts from "./components/Searchproducts";
import Previousorders from "./components/Previousorders";
import Test from "./components/Test";
import Newhome from "./components/Newhome";
import Orderdetails from "./components/Orderdetails";

function App() {
  // const token = localStorage.getItem("authToken");
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  useEffect(() => {
    // Check if token exists in localStorage
    const storedToken = localStorage.getItem("authToken");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const [dataArray, setDataArray] = useState([]);

  const handleDataChange = (newDataArray) => {
    setDataArray(newDataArray);
  };

  return (
    <Router>
      {token ? (
        <Navbarlogin onDataChange={handleDataChange} />
      ) : (
        <Navbar onDataChange={handleDataChange} />
      )}
      <Routes>
        <Route path="/" element={<Newhome />} />
        <Route path="/Test" element={<Test />} />
        <Route
          path="/Searchproducts"
          element={
            dataArray.length > 0 ? (
              <Searchproducts dataArray={dataArray} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {token ? (
          <>
            <Route path="/Cart" element={<Test />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Changepass" element={<Changepass />} />
            <Route path="/Previousorders" element={<Previousorders />} />
            <Route path="/Orderdetails/:id" element={<Orderdetails />} />
            <Route path="/Login" element={<Navigate to="/" />} />
            <Route path="/Register" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/Cart" element={<Navigate to="/Login" />} />
            <Route path="/Profile" element={<Navigate to="/Login" />} />
            <Route path="/Previousorders" element={<Navigate to="/Login" />} />
          </>
        )}
        <Route path="/Login" element={<Login setToken={setToken} />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
