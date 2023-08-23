import { Navigate } from 'react-router-dom';
import { useCadastroController } from '../controller/CadastroController';
import React from 'react';
import { Link } from 'react-router-dom';
import "../resources/CSS/Cadastro.css";

export const Cadastro = () => {
  const {
    nome, setNome, 
    email, setEmail, 
    cpf, setCpf,
    telefone, setTelefone,
    senha, setSenha,
    cadastradoComSucesso,
    criarUsuario
  } = useCadastroController();

  return (
    <div className="containerr">
      <div className="contente_cadastro">      
        <div className="cadastro">
          <form onSubmit={criarUsuario}> 
            {cadastradoComSucesso && <Navigate to="/home" />}
            <h2>C A D A S T R O</h2> 
            <label for="nome_cad">Nome: </label>
            <input id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
            <label for="email_cad">E-mail: </label>
            <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/> 
            <label for="cpf_cad">CPF: </label>
            <input id="cpf" name="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)}/> 
            <label for="cpf_cad">Telefone: </label>
            <input id="tel" name="tel" type="tel" value={telefone} onChange={(e) => setTelefone(e.target.value)}/> 
            <label for="senha_cad">Senha: </label>
            <input id="senha" name="senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
            <input type="submit" value="Cadastrar"/> 
            <p className="link_c">  
              Já tem conta?
              <Link to="/Login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
