"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Criando um array para armazenar os Posts em memória
const posts = [];
// Criando o servidor Express
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rota: Retorna todos os posts existentes
app.get('/posts', (req, res) => {
    res.json(posts);
});
// Rota: Retorna um post específico com base no seu ID
app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((p) => p.id === id);
    if (post) {
        res.json(post);
    }
    else {
        res.status(404).json({ message: 'Post não encontrado.' });
    }
});
// Rota: Cria um novo post
app.post('/posts', (req, res) => {
    const { nome, descricao, categoria } = req.body;
    const id = posts.length + 1;
    const newPost = { id, nome, descricao, categoria };
    posts.push(newPost);
    res.json(newPost);
});
// Rota: Atualiza um post existente com base no seu ID
app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, descricao, categoria } = req.body;
    const index = posts.findIndex((p) => p.id === id);
    if (index !== -1) {
        posts[index] = { id, nome, descricao, categoria };
        res.json(posts[index]);
    }
    else {
        res.status(404).json({ message: 'Post não encontrado.' });
    }
});
// Rota: Exclui um post existente com base no seu ID
app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex((p) => p.id === id);
    if (index !== -1) {
        const deletedPost = posts.splice(index, 1);
        res.json({ message: 'Post removido com sucesso.' });
    }
    else {
        res.status(404).json({ message: 'Post não encontrado.' });
    }
});
// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000.');
});
