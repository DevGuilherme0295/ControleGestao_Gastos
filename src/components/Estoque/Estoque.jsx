import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Estoque.css";

export default function Estoque() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState("");
  const [precoUni, setPrecoUni] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("Kg");
  const [estoque, setEstoque] = useState([]);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [produtoEditado, setProdutoEditado] = useState("");
  const [precoEditado, setPrecoEditado] = useState("");
  const [quantidadeEditada, setQuantidadeEditada] = useState("");
  const [unidadeEditada, setUnidadeEditada] = useState("Kg");

  useEffect(() => {
    const estoqueSalvo = JSON.parse(localStorage.getItem("estoque")) || [];
    setEstoque(estoqueSalvo);
  }, []);

  function registrarProduto() {
    const novoProduto = {
      id: Date.now(),
      produto,
      quantidade,
      precoUni,
      unidade,
    };

    const produtosAtualizados = [...estoque, novoProduto];

    localStorage.setItem("estoque", JSON.stringify(produtosAtualizados));
    setEstoque(produtosAtualizados);

    setProduto("");
    setQuantidade("");
    setPrecoUni("");
    setUnidade("Kg");
  }

  function abrirModalEditar(item) {
    setProdutoSelecionado(item);

    setProdutoEditado(item.produto);
    setPrecoEditado(item.precoUni);
    setQuantidadeEditada(item.quantidade);
    setUnidadeEditada(item.unidade);

    setModalEditar(true);
  }

  function salvarEdicao() {
    const estoqueAtualizado = estoque.map((item) => {
      if (item.id === produtoSelecionado.id) {
        return {
          ...item,
          produto: produtoEditado,
          precoUni: precoEditado,
          quantidade: quantidadeEditada,
          unidade: unidadeEditada,
        };
      }

      return item;
    });

    localStorage.setItem("estoque", JSON.stringify(estoqueAtualizado));
    setEstoque(estoqueAtualizado);

    setModalEditar(false);
    setProdutoSelecionado(null);
  }

  function abrirModalExcluir(item) {
    setProdutoSelecionado(item);
    setModalExcluir(true);
  }

  function excluirProduto() {
    const estoqueAtualizado = estoque.filter(
      (item) => item.id !== produtoSelecionado.id
    );

    localStorage.setItem("estoque", JSON.stringify(estoqueAtualizado));
    setEstoque(estoqueAtualizado);

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
            <input
              type="text"
              placeholder="Nome do produto"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
            />

            <input
              type="number"
              placeholder="Preço Unitário"
              value={precoUni}
              onChange={(e) => setPrecoUni(e.target.value)}
            />

            <input
              type="number"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
            />

            <select
              value={unidade}
              onChange={(e) => setUnidade(e.target.value)}
            >
              <option>Kg</option>
              <option>Unidade</option>
              <option>Caixa</option>
              <option>Maço</option>
            </select>

            <button type="button" onClick={registrarProduto}>
              Adicionar
            </button>
          </form>
        </div>

        <div className="estoque-lista">
          <h2>Produtos em estoque</h2>

          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço Unitário</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {estoque.map((item) => (
                <tr key={item.id}>
                  <td>{item.produto}</td>
                  <td>{item.quantidade}</td>
                  <td>R$ {item.precoUni}</td>
                  <td>{item.unidade}</td>

                  <td>
                    <div className="acoes-buttons">
                      <button
                        className="editar-button"
                        onClick={() => abrirModalEditar(item)}
                      >
                        Editar
                      </button>

                      <button
                        className="excluir-button"
                        onClick={() => abrirModalExcluir(item)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="voltar-button" onClick={() => navigate("/menu")}>
          Voltar
        </button>
      </div>

      {modalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Editar Produto</h2>

            <div className="modal-campo">
              <label>Nome do produto</label>
              <input
                type="text"
                value={produtoEditado}
                onChange={(e) => setProdutoEditado(e.target.value)}
              />
            </div>

            <div className="modal-campo">
              <label>Preço Unitário</label>
              <input
                type="number"
                value={precoEditado}
                onChange={(e) => setPrecoEditado(e.target.value)}
              />
            </div>

            <div className="modal-campo">
              <label>Quantidade</label>
              <input
                type="number"
                value={quantidadeEditada}
                onChange={(e) => setQuantidadeEditada(e.target.value)}
              />
            </div>

            <div className="modal-campo">
              <label>Unidade</label>
              <select
                value={unidadeEditada}
                onChange={(e) => setUnidadeEditada(e.target.value)}
              >
                <option>Kg</option>
                <option>Unidade</option>
                <option>Caixa</option>
                <option>Maço</option>
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

            <p>
              Tem certeza que deseja excluir o produto{" "}
              <strong>{produtoSelecionado?.produto}</strong> do estoque?
            </p>

            <div className="modal-buttons">
              <button onClick={() => setModalExcluir(false)}>Cancelar</button>

              <button className="confirmar-exclusao" onClick={excluirProduto}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}