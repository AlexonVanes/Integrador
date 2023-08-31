import { Route, BrowserRouter, Switch, Routes } from "react-router-dom";
import { Cadastro } from "./view/Cadastro";
import Login from "./view/Login";
import Cofrinho from "./view/Cofrinho";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cofrinho" element={<Cofrinho/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
