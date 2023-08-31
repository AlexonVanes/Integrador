import { Route, BrowserRouter, Switch, Routes } from "react-router-dom";
import { Cadastro } from "./view/Cadastro";
import Login from "./view/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro/>}/>
        <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
