import { useState } from 'react';
import { UserService } from '../domain/service/UserService';
import { UserDTO } from '../domain/dto/UserDTO';

export const useCadastroController = () => {
  const [userDTO, setUserDTO] = useState(new UserDTO("", "", "", "", ""));
  const [cadastradoComSucesso, setCadastradoComSucesso] = useState(false);

  const criarUsuario = async (e) => {
    e.preventDefault();
    
    const user = {
      nome: userDTO.nome,
      email: userDTO.email,
      cpf: userDTO.cpf,
      telefone: userDTO.telefone,
      senha: userDTO.senha
    };

    const result = await UserService.criarUsuario(user);
    
    if (result.success) {
      alert(result.message);
      setCadastradoComSucesso(true);
    } else {
      alert(result.message);
    }
  }

  return {
    userDTO,
    setUserDTO,
    cadastradoComSucesso,
    criarUsuario,
  };
}
