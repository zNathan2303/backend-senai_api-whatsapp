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
const getDadosDoPerfilByNumber = (numero) => {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nathan da Silva Costa',
        id: 0,
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
        if (usuario.number == numero) {
            message.id = usuario.id
            message.nome = usuario.account
            message.nick = usuario.nickname
            message.foto = usuario['profile-image']
            message.numero = usuario.number
            message.corDeFundo = usuario.background
            message.criacaoDaConta.inicio = usuario['created-since'].start
            message.criacaoDaConta.fim = usuario['created-since'].end
        }
    })

    if (message.numero)
        return message // 200
    else
        return MESSAGE_ERRO // 500
}

// Lista dados de todos os contatos de um usuario
const getDadosDeContatosByNumber = (numero) => {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nathan da Silva Costa',
        contatos: []
    }

    dados.contatos['whats-users'].forEach(usuario => {
        if (usuario.number == numero) {
            usuario.contacts.forEach(contato => {
                const contatoInfo = {
                    id: contato.id,
                    nome: contato.name,
                    numero: contato.number,
                    descricao: contato.description,
                    imagem: contato.image
                }
                message.contatos.push(contatoInfo)
            })
        }
    })

    if (message.contatos.length)
        return message // 200
    else
        return MESSAGE_ERRO // 500
}

// Lista todas as mensagens de uma conta de usuário
const getAllMensagensByNumber = (numero) => {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nathan da Silva Costa',
        contatos: []
    }

    dados.contatos['whats-users'].forEach(usuario => {
        if (usuario.number == numero) {
            usuario.contacts.forEach(contato => {
                let contatoInfo = {
                    nome: contato.name,
                    numero: contato.number,
                    descricao: contato.description,
                    imagem: contato.image,
                    mensagens: []
                }
                contato.messages.forEach(mensagem => {
                    const mensagemInfo = {
                        remetente: mensagem.sender,
                        conteudo: mensagem.content,
                        horario: mensagem.time
                    }
                    contatoInfo.mensagens.push(mensagemInfo)
                })
                message.contatos.push(contatoInfo)
            })
        }
    })

    if (message.contatos.length)
        return message // 200
    else
        return MESSAGE_ERRO // 500
}

// Lista uma conversa de um usuario e um contato
const getConversa = (numeroUsuario, numeroContato) => {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nathan da Silva Costa',
        mensagens: []
    }

    dados.contatos['whats-users'].forEach(usuario => {
        if (usuario.number == numeroUsuario) {
            message.usuarioInfo = {
                id: usuario.id,
                nome: usuario.account,
                nickname: usuario.nickname,
                criacao: {
                    inicio: usuario['created-since'].start,
                    fim: usuario['created-since'].end
                },
                foto: usuario['profile-image'],
                numero: usuario.number,
                corDeFundo: usuario.background
            }
            usuario.contacts.forEach(contato => {
                if (contato.number == numeroContato) {
                    message.contatoInfo = {
                        nome: contato.name,
                        numero: contato.number,
                        descricao: contato.description,
                        imagem: contato.image
                    }

                    contato.messages.forEach(mensagem => {
                        const mensagemInfo = {
                            remetente: mensagem.sender,
                            conteudo: mensagem.content,
                            horario: mensagem.time
                        }

                        message.mensagens.push(mensagemInfo)
                    })
                }
            })
        }
    })

    if (message.mensagens.length)
        return message // 200
    else
        return MESSAGE_ERRO // 500
}

// Obtem uma lista de mensagens de uma conversa com base na palavra chave que o usuario buscou
const getMensagensByPalavraChave = (numeroUsuario, numeroContato, palavraChave) => {
    let message = {
        status: true,
        status_code: 200,
        development: 'Nathan da Silva Costa',
        mensagens: []
    }

    dados.contatos['whats-users'].forEach(usuario => {
        if (usuario.number == numeroUsuario) {
            message.usuarioInfo = {
                id: usuario.id,
                nome: usuario.account,
                nickname: usuario.nickname,
                criacao: {
                    inicio: usuario['created-since'].start,
                    fim: usuario['created-since'].end
                },
                foto: usuario['profile-image'],
                numero: usuario.number,
                corDeFundo: usuario.background
            }
            usuario.contacts.forEach(contato => {
                if (contato.number == numeroContato) {
                    message.contatoInfo = {
                        nome: contato.name,
                        numero: contato.number,
                        descricao: contato.description,
                        imagem: contato.image
                    }

                    contato.messages.forEach(mensagem => {
                        if (mensagem.content.toLowerCase().includes(palavraChave.toLowerCase())) {
                            const mensagemInfo = {
                                remetente: mensagem.sender,
                                conteudo: mensagem.content,
                                horario: mensagem.time
                            }

                            message.mensagens.push(mensagemInfo)
                        }
                    })
                }
            })
        }
    })

    if (message.mensagens.length)
        return message // 200
    else
        return MESSAGE_ERRO // 500
}

module.exports = {
    getAllDados,
    getDadosDoPerfilByNumber,
    getDadosDeContatosByNumber,
    getAllMensagensByNumber,
    getConversa,
    getMensagensByPalavraChave
}