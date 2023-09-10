import { loginUser, sendResetPasswordEmail, registerUser } from "../../common/FirebaseAuth";
import { app } from "../../common/FirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

export async function userExistsInFirestore(email) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

export function login(userDTO) {
    return loginUser(userDTO.email, userDTO.password);
}

export function forgotPassword(email) {
    return sendResetPasswordEmail(email);
}

export async function authenticateIfUserMatches(userDTO) {
    try {
        await login(userDTO);
    } catch (error) {
        console.error(`Erro ao tentar logar com o email: ${userDTO.email}. Verificando se ele existe no Firestore...`);
        if (await userExistsInFirestore(userDTO.email)) {
            await registerUser(userDTO.email, userDTO.password);
        } else {
            console.error(`Erro ao autenticar usuário com o email: ${userDTO.email}`, error);
            throw new Error("Erro ao autenticar usuário. Verifique suas credenciais ou tente novamente.");
        }
    }
}
