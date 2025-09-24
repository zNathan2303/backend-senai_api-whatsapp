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

// Obtém todos os dados
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

// Obtém os dados referente ao perfil do id passado como parametro
const getDadosDoPerfilById = (id) => {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nathan da Silva Costa',
        nome: '',
        nick: '',
        foto: '',
        numero: '',
        corDeFundo: '',
        criacaoDaConta: {
            inicio: '',
            fim: ''
        }
    }

    dados.contatos['whats-users'].forEach(usuario => {
        if (usuario.id == id) {
            message.nome = usuario.account
            message.nick = usuario.nickname
            message.foto = usuario['profile-image']
            message.numero = usuario.number
            message.corDeFundo = usuario.background
            message.criacaoDaConta.inicio = usuario['created-since'].start
            message.criacaoDaConta.fim = usuario['created-since'].end
        }
    })

    if (message.nome || message.nick || message.foto || message.numero ||
        message.corDeFundo || message.criacaoDaConta.inicio || message.criacaoDaConta.fim)
        return message // 200
    else
        return MESSAGE_ERRO // 500
}

// Lista dados de todos os contatos de um usuario
const getDadosDeContatosById = (id) => {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nathan da Silva Costa',
        contatos: []
    }

    dados.contatos['whats-users'].forEach(usuario => {
        if (usuario.id == id) {
            usuario.contacts.forEach(contato => {
                const contatoInfo = {
                    nome: contato.name,
                    numero: contato.number,
                    descricao: contato.description,
                    imagem: contato.image
                }
                message.contatos.push(contatoInfo)
            })
        }
    })

    if (message.contatos)
        return message // 200
    else
        return MESSAGE_ERRO // 500
}

// Lista todas as mensagens de uma conta de usuário
const getMensagens = (id) => {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nathan da Silva Costa',
        contatos: []
    }

    dados.contatos['whats-users'].forEach(usuario => {
        if (usuario.id == id) {
            usuario.contacts.forEach(contato => message.contatos.push(contato))
        }
    })

    if (message.contatos)
        return message // 200
    else
        return MESSAGE_ERRO // 500
}

module.exports = {
    getAllDados,
    getDadosDoPerfilById,
    getDadosDeContatosById,
    getMensagens
}