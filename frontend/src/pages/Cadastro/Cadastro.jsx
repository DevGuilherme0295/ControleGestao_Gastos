import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios, saveUsuarios } from "../../utils/storage";
import "./Cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  function cadastrar() {
    if (!nome || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    const usuarios = getUsuarios();

    if (usuarios.some((u) => u.email === email)) {
      setErro("Já existe uma conta com esse e-mail.");
      return;
    }

    saveUsuarios([...usuarios, { id: Date.now(), nome, email, senha }]);
    navigate("/menu");
  }

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">
        <h1>Cadastro</h1>
        <p>Crie uma conta para acessar o sistema.</p>

        <form className="cadastro-form">
          <label>Nome completo</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => { setNome(e.target.value); setErro(""); }}
          />

          <label>E-mail</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErro(""); }}
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={senha}
            onChange={(e) => { setSenha(e.target.value); setErro(""); }}
          />

          <label>Confirmar senha</label>
          <input
            type="password"
            placeholder="Repita a senha"
            value={confirmarSenha}
            onChange={(e) => { setConfirmarSenha(e.target.value); setErro(""); }}
          />

          {erro && <p className="erro-msg">{erro}</p>}

          <div className="cadastro-buttons">
            <button type="button" onClick={() => navigate("/")}>Voltar</button>
            <button type="button" onClick={cadastrar}>Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
