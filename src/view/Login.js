import React, { useState } from "react";
import { LoginController } from "../controller/LoginController";
import { Link } from "react-router-dom";
import ErrorHandler from "../handler/ErrorHandler";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (forgotPassword) {
      LoginController.handleForgotPassword(email, setMensagem);
    } else {
      try {
        const response = await LoginController.handleSignIn(email, senha);
        if (response.success) {
          // Redirecionar para a Home ou outra ação desejada
          window.location.href = "/Home";
        } else {
          window.alert(response.message);
        }
      } catch (error) {
        const handledError = ErrorHandler.handle(error);
        window.alert(handledError.message);
      }
    }
  }

  function handleSignIn(e) {
    e.preventDefault();
    
    LoginController.signIn(email, senha)
      .then(response => {
        if(response.success) {
          // Usando o componente Link para navegar
          window.location.href = "/Home";
        } else {
          window.alert(response.message);
        }
      })
      .catch(error => {
        const handledError = ErrorHandler.handle(error);
        window.alert(handledError.message);
      });
  }

  return (
    <div className="containerr">
      <div className="contente_login">
        <div className="login">
          <form onSubmit={handleSubmit}>
            <h2>{forgotPassword ? "Esqueceu sua senha?" : "L O G I N"}</h2>
            <p>
              <label htmlFor="email">E-mail:</label>
              <input
                id="email"
                name="email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </p>
            {forgotPassword ? (
              <p className="link_l">
                Lembrou da senha?{" "}
                <a href="#" onClick={() => setForgotPassword(false)}>
                  Faça login
                </a>
              </p>
            ) : (
              <>
                <p>
                  <label htmlFor="senha">Senha:</label>
                  <input
                    id="senha"
                    name="senha"
                    required
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </p>
                <p className="link_l">
                  Ainda não tem conta?{" "}
                  <Link to="/Cadastro">
                    <span>Cadastre-se</span>
                  </Link>
                </p>
                <p className="link_r">
                  <a href="#" onClick={() => setForgotPassword(true)}>
                    Esqueceu sua senha?
                  </a>
                </p>
              </>
            )}
            <p>
              <input
                type="submit"
                value={forgotPassword ? "Enviar link para redefinição de senha" : "Logar"}
              />
            </p>
          </form>
          {mensagem && <p className="message">{mensagem}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
