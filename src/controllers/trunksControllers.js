import { getTrunks } from "../models/trunksModels.js";

/**
 * 
 * Aqui é o controller do trunks.
 * Ele é responsável por receber as requisições da rota, processar os dados e retornar um resultado, nesse caso como é um get não tem nada que precisa ser pego na requisição, apenas fazer a operação para buscar os troncos e retornar.
 * 
*/

export class TrunksController {
    getTrunks = async () => {
        const trunks_data = await getTrunks();
        return trunks_data;
    }
}