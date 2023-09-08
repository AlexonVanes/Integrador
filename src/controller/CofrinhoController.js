import { CofrinhoService } from '../domain/service/CofrinhoService';
import { CofrinhoModel } from '../domain/model/CofrinhoModel';
import CofrinhoDTO from '../domain/dto/CofrinhoDTO'
import { getAuth } from 'firebase/auth';

export class CofrinhoController {
  constructor() {
    this.service = new CofrinhoService(this);
  }
  
  async calculateTimeToReachGoal(req, res) {
    try {
      const cofrinhoId = req.params.cofrinhoId;
      const monthsRequired = await this.service.calculateTimeToReachGoal(cofrinhoId);
      res.status(200).json({ monthsRequired });
    } catch (error) {
      res.status(500).json({ message: "Error calculating time to goal" });
    }
}

async addValueToCofrinho(req, res) {
  try {
    const cofrinhoId = req.params.cofrinhoId;
    const { value } = req.body;
    const updatedCofrinho = await this.service.addValueToCofrinho(cofrinhoId, value);
    res.status(200).json(updatedCofrinho);
  } catch (error) {
    res.status(500).json({ message: "Error adding value to cofrinho" });
  }
}

async retrieveValueFromCofrinho(req, res) {
  try {
    const cofrinhoId = req.params.cofrinhoId;
    const { value } = req.body;
    const updatedCofrinho = await this.service.retrieveValueFromCofrinho(cofrinhoId, value);
    res.status(200).json(updatedCofrinho);
  } catch (error) {
    if (error.message === "Não há saldo suficiente no cofrinho.") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error retrieving value from cofrinho" });
    }
  }
}

getCurrentUserEmail() {
  const auth = getAuth();
  return auth.currentUser ? auth.currentUser.email : null;
}

async createCofrinho(data) {
  try {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const userEmail = auth.currentUser ? auth.currentUser.email : null;
    
    if (!userId) {
      throw new Error("UserID não fornecido ou inválido.");
    }

    if (!userEmail) {
      throw new Error("Email do usuário não fornecido ou inválido.");
    }

    // Verificar se o usuário já tem um cofrinho
    const userCofrinho = await this.service.getCofrinhoByUser(userId);
    if (userCofrinho && userCofrinho.length > 0) {
      throw new Error("O usuário já possui um cofrinho.");
    }

    data.userId = userId; 
    data.userEmail = userEmail;

    const result = await this.service.createCofrinho(data);
    return { 
      status: 200, 
      data: new CofrinhoModel(
        result.id, 
        data.nomeCofrinho, 
        data.descricaoCofrinho, 
        data.valorMensalCofrinho, 
        data.metaCofrinho, 
        data.userId, 
        data.userEmail
      )
    };
  } catch (error) {
    console.log("Erro ao criar Cofrinho:", error.message);
    throw error;
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

  async doesCofrinhoExistForUser(userId) {
    const cofrinhos = await this.service.getCofrinhosByUserId(userId);
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
