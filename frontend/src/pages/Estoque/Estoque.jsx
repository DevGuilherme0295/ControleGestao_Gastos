import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listar, criar, atualizar, excluir } from "../../services/dadosService";
import { UNIDADES } from "../../utils/constants";
import "./Estoque.css";

export default function Estoque() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState("");
  const [precoUni, setPrecoUni] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState(UNIDADES[0]);
  const [estoque, setEstoque] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [produtoEditado, setProdutoEditado] = useState("");
  const [precoEditado, setPrecoEditado] = useState("");
  const [quantidadeEditada, setQuantidadeEditada] = useState("");
  const [unidadeEditada, setUnidadeEditada] = useState(UNIDADES[0]);

  useEffect(() => {
    listar("estoque").then((dados) => {
      setEstoque(dados);
      setCarregando(false);
    });
  }, []);

  async function registrarProduto() {
    if (!produto || !precoUni || !quantidade) {
      alert("Preencha todos os campos.");
      return;
    }

    const novo = { id: Date.now(), produto, quantidade, precoUni, unidade };
    await criar("estoque", novo);
    setEstoque((prev) => [...prev, novo]);

    setProduto("");
    setQuantidade("");
    setPrecoUni("");
    setUnidade(UNIDADES[0]);
  }

  function abrirModalEditar(item) {
    setProdutoSelecionado(item);
    setProdutoEditado(item.produto);
    setPrecoEditado(item.precoUni);
    setQuantidadeEditada(item.quantidade);
    setUnidadeEditada(item.unidade);
    setModalEditar(true);
  }

  async function salvarEdicao() {
    const dados = { produto: produtoEditado, precoUni: precoEditado, quantidade: quantidadeEditada, unidade: unidadeEditada };
    await atualizar("estoque", produtoSelecionado.id, dados);
    setEstoque((prev) =>
      prev.map((item) => item.id === produtoSelecionado.id ? { ...item, ...dados } : item)
    );
    setModalEditar(false);
    setProdutoSelecionado(null);
  }

  function abrirModalExcluir(item) {
    setProdutoSelecionado(item);
    setModalExcluir(true);
  }

  async function excluirProduto() {
    await excluir("estoque", produtoSelecionado.id);
    setEstoque((prev) => prev.filter((item) => item.id !== produtoSelecionado.id));
    setModalExcluir(false);
    setProdutoSelecionado(null);
  }

  return (
    <div className="estoque-page">
      <div className="estoque-container">
        <div className="estoque-header">
          <h1>Estoque</h1>
          <p>Controle simples dos produtos disponíveis para venda.</p>
        </div>

        <div className="estoque-card">
          <h2>Adicionar produto</h2>
          <form className="estoque-form">
            <input type="text" placeholder="Nome do produto" value={produto} onChange={(e) => setProduto(e.target.value)} />
            <input type="number" placeholder="Preço Unitário" value={precoUni} onChange={(e) => setPrecoUni(e.target.value)} />
            <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            <select value={unidade} onChange={(e) => setUnidade(e.target.value)}>
              {UNIDADES.map((u) => <option key={u}>{u}</option>)}
            </select>
            <button type="button" onClick={registrarProduto}>Adicionar</button>
          </form>
        </div>

        <div className="estoque-lista">
          <h2>Produtos em estoque</h2>
          {carregando ? (
            <p style={{ color: "#888", textAlign: "center", padding: "24px" }}>Carregando...</p>
          ) : (
            <table>
              <thead>
                <tr><th>Produto</th><th>Quantidade</th><th>Preço Unitário</th><th>Unidade</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {estoque.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", color: "#888", padding: "24px" }}>Nenhum produto cadastrado.</td></tr>
                ) : (
                  estoque.map((item) => (
                    <tr key={item.id}>
                      <td>{item.produto}</td>
                      <td>{item.quantidade}</td>
                      <td>R$ {item.precoUni}</td>
                      <td>{item.unidade}</td>
                      <td>
                        <div className="acoes-buttons">
                          <button className="editar-button" onClick={() => abrirModalEditar(item)}>Editar</button>
                          <button className="excluir-button" onClick={() => abrirModalExcluir(item)}>Excluir</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <button className="voltar-button" onClick={() => navigate("/menu")}>Voltar</button>
      </div>

      {modalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Editar Produto</h2>
            <div className="modal-campo"><label>Nome do produto</label><input type="text" value={produtoEditado} onChange={(e) => setProdutoEditado(e.target.value)} /></div>
            <div className="modal-campo"><label>Preço Unitário</label><input type="number" value={precoEditado} onChange={(e) => setPrecoEditado(e.target.value)} /></div>
            <div className="modal-campo"><label>Quantidade</label><input type="number" value={quantidadeEditada} onChange={(e) => setQuantidadeEditada(e.target.value)} /></div>
            <div className="modal-campo">
              <label>Unidade</label>
              <select value={unidadeEditada} onChange={(e) => setUnidadeEditada(e.target.value)}>
                {UNIDADES.map((u) => <option key={u}>{u}</option>)}
              </select>
            </div>
            <div className="modal-buttons">
              <button onClick={() => setModalEditar(false)}>Cancelar</button>
              <button onClick={salvarEdicao}>Salvar</button>
            </div>
          </div>
        </div>
      )}

      {modalExcluir && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir <strong>{produtoSelecionado?.produto}</strong> do estoque?</p>
            <div className="modal-buttons">
              <button onClick={() => setModalExcluir(false)}>Cancelar</button>
              <button className="confirmar-exclusao" onClick={excluirProduto}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
