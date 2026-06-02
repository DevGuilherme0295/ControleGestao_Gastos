const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const movimentacoesRoutes = require("./routes/movimentacoes");
const estoqueRoutes = require("./routes/estoque");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/movimentacoes", movimentacoesRoutes);
app.use("/estoque", estoqueRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
