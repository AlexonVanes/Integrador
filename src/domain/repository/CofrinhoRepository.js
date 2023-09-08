import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { app } from "../../common/FirebaseConfig";

export class CofrinhoRepository {
  constructor() {
    this.db = getFirestore(app);
    this.collectionRef = collection(this.db, "cofrinho");
  }

  async addCofrinho(cofrinhoData) {
    return await addDoc(this.collectionRef, cofrinhoData);
  }

  async getCofrinhoByUserId(userId) {
    const q = query(this.collectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let cofrinhos = [];
    querySnapshot.forEach((doc) => {
      cofrinhos.push({ id: doc.id, ...doc.data() });
    });
    return cofrinhos;
  }
  async createCofrinho(cofrinhoData, userEmail) {
    cofrinhoData.userEmail = userEmail;
    return await this.addCofrinho(cofrinhoData); // Chame a função addCofrinho diretamente
  }
  

  async updateCofrinho(cofrinhoId, updatedData) {
    const cofrinhoDoc = doc(this.db, "cofrinho", cofrinhoId);
    return await updateDoc(cofrinhoDoc, updatedData);
  }

  async deleteCofrinho(cofrinhoId) {
    const cofrinhoDoc = doc(this.db, "cofrinho", cofrinhoId);
    return await deleteDoc(cofrinhoDoc);
  }
  async findCofrinhoByName(name) {
    const q = query(this.collectionRef, where("nomeCofrinho", "==", name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }
  

  async getCofrinhoById(cofrinhoId) {
    const cofrinhoDoc = doc(this.db, "cofrinho", cofrinhoId);
    const cofrinhoSnapshot = await getDoc(cofrinhoDoc);
    if (cofrinhoSnapshot.exists()) {
      return { id: cofrinhoSnapshot.id, ...cofrinhoSnapshot.data() };
    } else {
      throw new Error("Cofrinho não encontrado");
    }
  }
  
  
  async getCofrinhoByEmail(email) {
    const qCofrinho = query(collection(this.db, 'cofrinho'), where("userEmail", "==", email));
    const querySnapshotCofrinho = await getDocs(qCofrinho);
    if (querySnapshotCofrinho.empty) {
      throw new Error("Nenhuma conta corrente encontrada para o email fornecido.");
    }
    const docSnapshot = querySnapshotCofrinho.docs[0];
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    };
  }



  
}
