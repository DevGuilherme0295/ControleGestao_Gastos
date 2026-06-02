// Middleware de autenticação — valida o token JWT em rotas protegidas.
// TODO: implementar quando o sistema de login estiver conectado ao backend.

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  // TODO: verificar e decodificar o JWT
  // const token = authHeader.split(" ")[1];
  // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { ... })

  next();
}

module.exports = { autenticar };
