import UserRepository  from '../repository/UserRepository';
import UserException  from '../exception/UserException';
import UserModel  from '../model/UserModel';
import ErrorHandler from '../../handler/ErrorHandler';



export const UserService = {
  async criarUsuario(userDTO) {
      try {
          const userModel = new UserModel(userDTO);
          if (!userModel.isValid()) {
              throw new UserException("Dados de usuário inválidos");
          }
          const userWithEmail = await UserRepository.getUserByEmail(userDTO.email);
          if (userWithEmail) throw new UserException("Já existe um usuário com esse email cadastrado");
          const userWithCPF = await UserRepository.getUserByCPF(userDTO.cpf);
          if (userWithCPF) throw new UserException("Já existe um usuário com esse CPF cadastrado");
          await UserRepository.addUser(userDTO);
          return { success: true, message: "Usuário criado com sucesso." };
          

      } catch (err) {
          const handledError = ErrorHandler.handle(err);
          return { success: false, message: handledError.message };
      }
  }

};


