import {
    auth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
  } from '../../common/FirebaseAuth';
  import UserException from '../exception/UserException';
  
  export const AuthService = {
    signIn: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return {
          success: true,
          message: "Logado com sucesso!",
          data: user
        };
      } catch (error) {
        throw new UserException(error.message, error.code);
      }
    },
  
    resetPassword: async (email) => {
      try {
        await sendPasswordResetEmail(email);
        return {
          success: true,
          message: "E-mail de redefinição enviado com sucesso!"
        };
      } catch (error) {
        throw new UserException(error.message, error.code);
      }
    }
  };
  