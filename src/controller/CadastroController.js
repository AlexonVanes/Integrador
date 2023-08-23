import { useState } from 'react';
import { UserService } from '../domain/service/UserService';



export const useCadastroController = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [cadastradoComSucesso, setCadastradoComSucesso] = useState(false);

  const criarUsuario = async (e) => {
    e.preventDefault();
    const user = { nome, email, cpf, telefone, senha };
    const result = await UserService.criarUsuario(user);
    if (result.success) {
        alert(result.message); // ou usar sua maneira preferida de mostrar notificações
        setCadastradoComSucesso(true);
    } else {
        alert(result.message); // mostre a mensagem de erro
    }
}

  return { 
    nome, setNome, 
    email, setEmail, 
    cpf, setCpf,
    telefone, setTelefone,
    senha, setSenha,
    cadastradoComSucesso,
    criarUsuario 
  };
}
