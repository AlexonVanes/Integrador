import { saveGasto } from '../domain/service/GastoService';
import { fetchAllGastos } from '../domain/service/GastoService';
import { deleteGastoService } from '../domain/service/GastoService';

export async function handleGastoSubmit(data, user) {
    try {
        await saveGasto(data, user);
        alert("Dados gravados com sucesso!");
    } catch (error) {
        alert("Erro ao gravar os dados: " + error.message);
    }
}

export async function getAllGastos(user) {
    try {
        const gastos = await fetchAllGastos(user);
        return gastos;
    } catch (error) {
        console.error("Erro ao buscar gastos no Controller:", error);
        throw error;
    }
}

export async function deleteGastoController(userId, titulo) {
    try {
        await deleteGastoService(userId, titulo);
    } catch (error) {
        console.error("Erro ao deletar gasto no Controller: ", error);
        throw error;
    }
}


