const express = require("express");
const router = express.Router();

// POST /auth/login
router.post("/login", (req, res) => {
  // TODO: validar email e senha contra o banco de dados
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

// POST /auth/cadastro
router.post("/cadastro", (req, res) => {
  // TODO: criar novo usuário no banco de dados
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

// POST /auth/logout
router.post("/logout", (req, res) => {
  // TODO: invalidar token
  res.status(501).json({ mensagem: "Não implementado ainda" });
});

module.exports = router;
