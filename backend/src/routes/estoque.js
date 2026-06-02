const express = require("express");
const router = express.Router();

// GET /estoque
router.get("/", (req, res) => {
  // TODO: buscar todos os produtos do estoque do usuário autenticado
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

// POST /estoque
router.post("/", (req, res) => {
  // TODO: adicionar produto ao estoque
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

// PUT /estoque/:id
router.put("/:id", (req, res) => {
  // TODO: editar produto do estoque
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

// DELETE /estoque/:id
router.delete("/:id", (req, res) => {
  // TODO: remover produto do estoque
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

module.exports = router;
