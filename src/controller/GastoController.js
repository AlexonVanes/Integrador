import { saveGasto } from '../domain/service/GastoService';

export async function handleGastoSubmit(data, user) {
    try {
        await saveGasto(data, user);
        alert("Dados gravados com sucesso!");
    } catch (error) {
        alert("Erro ao gravar os dados: " + error.message);
    }
}
