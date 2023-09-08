import { findGastoByTitulo, createGasto } from '../repository/GastoRepository';

export async function saveGasto(gastoDTO, user) {
    if (!user.email) {
        throw new Error("Informações do usuário estão incompletas ou não fornecidas.");
    }
const existingGasto = await findGastoByTitulo(gastoDTO.titulo, user.uid);

if (existingGasto) {
    throw new Error("Você já possui um gasto com o mesmo título.");
}
    const data = {
        ...gastoDTO,
        email: user.email,
    };
    return await createGasto(data);
}
