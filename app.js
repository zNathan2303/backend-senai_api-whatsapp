/*******************************************************************************
 * Objetivo: Endpoints referente a API de Whatsapp
 * Data: 24/09/2025
 * Autor: Nathan da Silva Costa
 * Versão: 1.0.0
 * 
 * Observações: Instalação do Express, Cors
 * npm install  express      --save
 * npm install  cors         --save
 ******************************************************************************/

// Import das dependencias da API
const express = require('express') // Responsável pela API
const cors = require('cors') // Responsável pelas permissões da API (App)

// Import do arquivo de funções
const funcoes = require('./modulo/funcoes.js')

// Retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

const app = express()

// Configuração de permissões
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*') // Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET') // Verbos permitidos
    // Carrega as configurações no CORS da API
    app.use(cors())
    next() // Próximo, carregar os próximos endpoints
})

app.get('/v1/whatsapp', (request, response) => {
    let usuarios = funcoes.getAllDados()
    response.status(usuarios.status_code).json(usuarios)
})

app.get('/v1/whatsapp/perfil/:id', (request, response) => {
    let usuario = funcoes.getDadosDoPerfilById(request.params.id)
    response.status(usuario.status_code).json(usuario)
})

app.get('/v1/whatsapp/contatos/:id', (request, response) => {
    let contatos = funcoes.getDadosDeContatosById(request.params.id)
    response.status(contatos.status_code).json(contatos)
})

app.listen(PORT, () => {
    console.log(`API aguardando requisições ...`)
})