import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Users } from "./components/Users";
import { Navbar } from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Register } from "./components/Register";
const App = () => {
  return (

    <div className="App" >
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div >

  );
};

export default App;
