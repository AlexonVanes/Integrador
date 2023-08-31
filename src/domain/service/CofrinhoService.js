import { CofrinhoRepository } from '../repository/CofrinhoRepository';

export class CofrinhoService {
  constructor() {
    this.repository = new CofrinhoRepository();
  }

  async createCofrinho(cofrinhoData) {
    return await this.repository.addCofrinho(cofrinhoData);
  }

  async getCofrinhoByUser(userId) {
    return await this.repository.getCofrinhoByUserId(userId);
  }

  async updateCofrinhoData(cofrinhoId, updatedData) {
    return await this.repository.updateCofrinho(cofrinhoId, updatedData);
  }

  async deleteCofrinhoById(cofrinhoId) {
    return await this.repository.deleteCofrinho(cofrinhoId);
  }

  async checkCofrinhoExistsByName(name) {
    return await this.repository.findCofrinhoByName(name);
  }

  async validateCofrinhoData(cofrinhoData) {
    const doesExist = await this.checkCofrinhoExistsByName(cofrinhoData.nomeCofrinho);
    if (doesExist) {
      throw new Error("Um cofrinho com esse nome já existe.");
    }

    if (cofrinhoData.valorMensalCofrinho > cofrinhoData.metaCofrinho) {
      throw new Error("O valor inicial não pode ser maior que a meta.");
    }
  }
}
