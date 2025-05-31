import AllComponent from "./all users/AllComponent";
import "./App.css";
import Login from "./Page/Auth/Login";

import { Routes, Route } from "react-router-dom";
import Registration from "./Page/Auth/Registration";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllComponent />} />

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
