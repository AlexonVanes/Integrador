import { CofrinhoService } from '../domain/service/CofrinhoService';
import { CofrinhoModel } from '../domain/model/CofrinhoModel';

export class CofrinhoController {
  constructor() {
    this.service = new CofrinhoService();
  }

  async createCofrinho(data) {
    try {
      const doesExist = await this.doesCofrinhoExistByName(data.nomeCofrinho);
      if (doesExist) {
        throw new Error("Um cofrinho com esse nome já existe.");
  
      }
      
      if (data.valorMensalCofrinho > data.metaCofrinho) {
        throw new Error("O valor inicial não pode ser maior que a meta.");
      }

      const result = await this.service.createCofrinho(data);
      return { status: 200, data: new CofrinhoModel(result.id, data.nomeCofrinho, data.descricaoCofrinho, data.valorMensalCofrinho, data.metaCofrinho, data.userId, data.userEmail) };
    } catch (error) {
      console.log("Erro em CofrinhoController:", error.message);
      
      // Verifique se você está modificando a mensagem de erro aqui!
      throw error; // Certifique-se de apenas repassar o erro sem modificá-lo
  }
  }

  async getCofrinhoByUser(req, res) {
    try {
      const userId = req.params.userId;
      const cofrinho = await this.service.getCofrinhoByUser(userId);
      if (cofrinho) {
        res.status(200).json(cofrinho);
      } else {
        res.status(404).json({ message: "Cofrinho not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching cofrinho" });
    }
  }

  async updateCofrinho(req, res) {
    try {
      const cofrinhoId = req.params.cofrinhoId;
      const updatedData = req.body;
      const updatedCofrinho = await this.service.updateCofrinhoData(cofrinhoId, updatedData);
      if (updatedCofrinho) {
        res.status(200).json(updatedCofrinho);
      } else {
        res.status(404).json({ message: "Cofrinho not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating cofrinho" });
    }
  }

  async doesCofrinhoExistByName(name) {
    const cofrinhos = await this.service.checkCofrinhoExistsByName(name);
    return cofrinhos.length > 0;
  }

  async deleteCofrinho(req, res) {
    try {
      const cofrinhoId = req.params.cofrinhoId;
      await this.service.deleteCofrinhoById(cofrinhoId);
      res.status(200).json({ message: "Cofrinho deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting cofrinho" });
    }
  }
}
