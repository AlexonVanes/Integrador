import UserRepository from '../repository/UserRepository';
import UserException from '../exception/UserException';
import ErrorHandler from '../../handler/ErrorHandler';

export const UserService = {
  async criarUsuario(userDTO) {
    try {
   // Valide os campos da userDTO conforme necessário
      if (!userDTO.nome || !userDTO.email || !userDTO.cpf || !userDTO.telefone) {
        throw new UserException("Dados de usuário incompletos");
      }

      // Verifique se o usuário já existe pelo email ou CPF
      const userWithEmail = await UserRepository.getUserByEmail(userDTO.email);
      if (userWithEmail) throw new UserException("Já existe um usuário com esse email cadastrado");
      const userWithCPF = await UserRepository.getUserByCPF(userDTO.cpf);
      if (userWithCPF) throw new UserException("Já existe um usuário com esse CPF cadastrado");

      // Crie a lógica para salvar o usuário no banco de dados
      await UserRepository.addUser(userDTO);

      return { success: true, message: "Usuário criado com sucesso." };
    } catch (err) {
      console.error("UserService: Erro ao criar usuário:", err);
      const handledError = ErrorHandler.handle(err);
      return { success: false, message: handledError.message };
    }
  }
}