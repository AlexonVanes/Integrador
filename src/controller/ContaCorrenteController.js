import { getFirestore, collection, addDoc, where, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { app } from '../common/FirebaseConfig'
import { getAuth } from "firebase/auth";
import { getContaCorrenteByEmail, updateContaCorrente } from "../domain/repository/ContaCorrenteRepository";


class ContaCorrenteController {
  constructor() {
    this.auth = getAuth(); 
  }
    
  async verificarContaCorrenteExistente() {
    if (!this.auth.currentUser) {
      return false;
    }

    const db = getFirestore(app);
    const contaCorrenteQuery = query(collection(db, "contaCorrente"), where("email", "==", this.auth.currentUser.email));
    const querySnapshot = await getDocs(contaCorrenteQuery);
    
    return !querySnapshot.empty;
  }

  async getCurrentUserEmail() {
    if (!this.auth.currentUser) {
      throw new Error("Usuário não autenticado.");
    }

    return this.auth.currentUser.email;
  }

  async addRendaExtra(value) {
    try {
      const email = this.controller.auth.currentUser.email;
      const contaCorrenteData = await getContaCorrenteByEmail(email);
      if (contaCorrenteData.length === 0) {
        throw new Error("Conta corrente não encontrada para o usuário atual.");
      }
  
      const updatedRendaTotal = contaCorrenteData[0].rendaTotal + value;
      await updateContaCorrente(contaCorrenteData[0].id, { rendaTotal: updatedRendaTotal });
      return true;
    } catch (error) {
      throw new Error("Erro ao adicionar renda extra: " + error.message);
    }
  }

  async updateContaCorrente(id, data) {
    try {
      const db = getFirestore(app);
      const contaCorrenteRef = doc(db, 'contaCorrente', id);
      await updateDoc(contaCorrenteRef, data);
    } catch (error) {
      throw new Error("Erro ao atualizar conta corrente: " + error.message);
    }
  }

  async salvarContaCorrente(contaCorrenteDTO) {
    try {
      if (!this.auth.currentUser) {
        throw new Error("Faça login para salvar os dados!");
      }

      const db = getFirestore();
      const contaCorrenteCollectionRef = collection(db, "contaCorrente");
      const contaCorrenteExistente = await this.verificarContaCorrenteExistente();
      
      if (contaCorrenteExistente) {
        throw new Error("Você já possui uma conta corrente cadastrada!");
      }

      if (window.confirm("Tem certeza que deseja salvar esses dados?")) {
        const { nomeBanco, rendaMensal, data, email } = contaCorrenteDTO;
        const newContaCorrente = {
          nomeBanco,
          rendaMensal: Number(rendaMensal),
          data,
          rendaTotal: Number(rendaMensal),
          email
        };

        const docRef = await addDoc(contaCorrenteCollectionRef, newContaCorrente);
        return docRef.id;
      }
    } catch (error) {
      throw new Error("Erro ao salvar conta corrente: " + error.message);
    }
  }
}

export default ContaCorrenteController;
