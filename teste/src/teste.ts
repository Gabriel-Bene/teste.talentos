import express, { Request, Response } from 'express';

// Definindo a estrutura de dados dos Posts
interface Post {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
}

// Criando um array para armazenar os Posts em memória
const posts: Post[] = [];

// Criando o servidor Express
const app = express();
app.use(express.json());

// Rota: Retorna todos os posts existentes
app.get('/posts', (req: Request, res: Response) => {
  res.json(posts);
});

// Rota: Retorna um post específico com base no seu ID
app.get('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post não encontrado.' });
  }
});

// Rota: Cria um novo post
app.post('/posts', (req: Request, res: Response) => {
  const { nome, descricao, categoria } = req.body;
  const id = posts.length + 1;
  const newPost: Post = { id, nome, descricao, categoria };
  posts.push(newPost);
  res.json(newPost);
});

// Rota: Atualiza um post existente com base no seu ID
app.put('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { nome, descricao, categoria } = req.body;
  const index = posts.findIndex((p) => p.id === id);
  if (index !== -1) {
    posts[index] = { id, nome, descricao, categoria };
    res.json(posts[index]);
  } else {
    res.status(404).json({ message: 'Post não encontrado.' });
  }
});

// Rota: Exclui um post existente com base no seu ID
app.delete('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  if (index !== -1) {
    const deletedPost = posts.splice(index, 1);
    res.json({ message: 'Post removido com sucesso.' });
  } else {
    res.status(404).json({ message: 'Post não encontrado.' });
  }
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000.');
});
