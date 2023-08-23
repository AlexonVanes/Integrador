import { AuthService } from "../domain/service/AuthService";

export const LoginController = {
    handleSignIn: async (email, password) => {
    return await AuthService.signIn(email, password);
  },

  resetPassword: async (email) => {
    return await AuthService.resetPassword(email);
  },


  handleForgotPassword: async (email, setMensagem) => {
    try {
      const response = await AuthService.resetPassword(email);
      if (response.success) {
        setMensagem("Um e-mail com as instruções para redefinir sua senha foi enviado para " + email);
      } else {
        setMensagem(response.message);
      }
    } catch (error) {
      setMensagem("Ocorreu um erro ao tentar enviar o e-mail de redefinição de senha.");
    }
  }
};
