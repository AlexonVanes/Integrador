import { collection, addDoc, getDocs, query, where, getFirestore } from "firebase/firestore";
import { app } from "../../common/FirebaseConfig"; // Substitua 'pathToYourFirebaseConfig' pelo caminho do arquivo onde sua instância do Firebase é inicializada.

const db = getFirestore(app);
const gastosCollectionRef = collection(db, "gastos");

export async function findGastoByTitulo(titulo, userId) {
    const querySnapshot = await getDocs(
        query(gastosCollectionRef, where("titulo", "==", titulo), where("userId", "==", userId))
    );
    return !querySnapshot.empty;
}


export async function createGasto(data) {
    return await addDoc(gastosCollectionRef, data);
}
