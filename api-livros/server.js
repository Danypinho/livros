const express = require("express");
const { Livro, sequelize } = require("./models/Livro");

const app = express();
const PORT = 3001;

app.use(express.json());

sequelize.sync({ force: true }).then(() => {
  console.log("⚠️ Banco de dados recriado!");
});
// modificado

app.get("/livros", async (req, res) => {
  console.log("🔍 Rota /livros foi acessada!");
  const livros = await Livro.findAll();
  res.json(livros);
});
// modificado

app.post("/livros", async (req, res) => {
  const { titulo, autor } = req.body;
  const novoLivro = await Livro.create({ titulo, autor });
  res.status(201).json(novoLivro);
});

app.put("/livros/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, autor } = req.body;
  const livro = await Livro.findByPk(id);

  if (!livro) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }

  livro.titulo = titulo;
  livro.autor = autor;
  await livro.save();
  res.json(livro);
});

app.delete("/livros/:id", async (req, res) => {
  const { id } = req.params;
  const livro = await Livro.findByPk(id);

  if (!livro) {
    return res.status(404).json({ mensagem: "Livro não encontrado" });
  }

  await livro.destroy();
  res.json({ mensagem: "Livro excluído com sucesso!" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
