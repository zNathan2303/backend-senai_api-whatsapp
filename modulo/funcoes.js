/*******************************************************************************
 * Objetivo: Arquivo de funções para gerenciar a API de Whatsapp
 * Data: 24/09/2025
 * Autor: Nathan da Silva Costa
 * Versão: 1.0.0
 ******************************************************************************/

const MESSAGE_ERRO = {
    status: false,
    status_code: 500,
    development: 'Nathan da Silva Costa'
}

const dados = require('./contatos.js')

const getAllDados = () => {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nathan da Silva Costa'
    }

    message.usuarios = dados.contatos['whats-users']
    if (message.usuarios)
        return message // 200
    else
        return MESSAGE_ERRO // 500
}

module.exports = {
    getAllDados
}