// contaCorrenteRepository.js
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { app } from "../../common/FirebaseConfig" ;

const db = getFirestore(app);
export const getContaCorrenteByEmail = async (email) => {
  const qContaCorrente = query(collection(db, 'contaCorrente'), where("email", "==", email));
  const querySnapshotContaCorrente = await getDocs(qContaCorrente);
  if (querySnapshotContaCorrente.empty) {
    throw new Error("Nenhuma conta corrente encontrada para o email fornecido.");
  }
  const docSnapshot = querySnapshotContaCorrente.docs[0];
  return {
    id: docSnapshot.id,
    ...docSnapshot.data()
  };
}


export const updateContaCorrente = async (id, data) => {
  if (!id || !data) {
    throw new Error("ID e dados são obrigatórios para atualização.");
  }

  const contaCorrenteRef = doc(db, "contaCorrente", id);
  return await updateDoc(contaCorrenteRef, data);
}

