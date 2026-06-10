import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const { usuario: usuarioLogado, atualizarPerfil } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [nomeEditado, setNomeEditado] = useState("");
  const [emailEditado, setEmailEditado] = useState("");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    setCarregando(true);
    const snapshot = await getDocs(collection(db, "usuarios"));
    setUsuarios(snapshot.docs.map((d) => ({ uid: d.id, ...d.data() })));
    setCarregando(false);
  }

  function abrirEditar(usuario) {
    setUsuarioSelecionado(usuario);
    setNomeEditado(usuario.nome);
    setEmailEditado(usuario.email);
    setErro("");
    setModalEditar(true);
  }

  async function salvarEdicao() {
    if (!nomeEditado.trim() || !emailEditado.trim()) {
      setErro("Nome e e-mail são obrigatórios.");
      return;
    }

    const emailEmUso = usuarios.some(
      (u) => u.email === emailEditado && u.uid !== usuarioSelecionado.uid
    );
    if (emailEmUso) {
      setErro("Esse e-mail já está em uso por outro usuário.");
      return;
    }

    setSalvando(true);
    try {
      await atualizarPerfil(usuarioSelecionado.uid, {
        nome: nomeEditado.trim(),
        email: emailEditado.trim(),
      });

      setUsuarios((prev) =>
        prev.map((u) =>
          u.uid === usuarioSelecionado.uid
            ? { ...u, nome: nomeEditado.trim(), email: emailEditado.trim() }
            : u
        )
      );
      setModalEditar(false);
    } catch {
      setErro("Erro ao salvar. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>Administração</h1>
            <p>Gerencie os usuários cadastrados no sistema.</p>
          </div>
          <button className="voltar-button" onClick={() => navigate("/menu")}>
            Voltar
          </button>
        </div>

        <div className="admin-tabela">
          {carregando ? (
            <p style={{ color: "#888", textAlign: "center", padding: "32px" }}>
              Carregando usuários...
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="admin-vazio">
                      Nenhum usuário cadastrado.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.uid}>
                      <td>{u.nome}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={u.isAdmin ? "badge-admin" : "badge-user"}>
                          {u.isAdmin ? "Admin" : "Usuário"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="editar-button"
                          onClick={() => abrirEditar(u)}
                          disabled={u.uid === usuarioLogado?.uid}
                          title={u.uid === usuarioLogado?.uid ? "Edite sua conta no seu perfil" : ""}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Editar Usuário</h2>

            <div className="modal-campo">
              <label>Nome completo</label>
              <input
                type="text"
                value={nomeEditado}
                onChange={(e) => { setNomeEditado(e.target.value); setErro(""); }}
              />
            </div>

            <div className="modal-campo">
              <label>E-mail</label>
              <input
                type="email"
                value={emailEditado}
                onChange={(e) => { setEmailEditado(e.target.value); setErro(""); }}
              />
            </div>

            {erro && <p className="erro-msg">{erro}</p>}

            <div className="modal-buttons">
              <button onClick={() => { setModalEditar(false); setErro(""); }}>
                Cancelar
              </button>
              <button onClick={salvarEdicao} disabled={salvando}>
                {salvando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
