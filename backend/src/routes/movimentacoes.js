const express = require("express");
const router = express.Router();

// GET /movimentacoes
router.get("/", (req, res) => {
  // TODO: buscar todas as movimentações do usuário autenticado
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

// POST /movimentacoes
router.post("/", (req, res) => {
  // TODO: criar nova movimentação
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

// PUT /movimentacoes/:id
router.put("/:id", (req, res) => {
  // TODO: editar movimentação
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

// DELETE /movimentacoes/:id
router.delete("/:id", (req, res) => {
  // TODO: excluir movimentação
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

module.exports = router;
