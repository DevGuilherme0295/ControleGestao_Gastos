import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Detalhes.css";

export default function DetalheVenda() {
  const navigate = useNavigate();
  const location = useLocation();

  const vendaRecebida = location.state;

  if (!vendaRecebida) {
    return (
      <div className="detalhe-page">
        <div className="detalhe-card">
          <h1>Nenhuma movimentação selecionada</h1>
          <button onClick={() => navigate("/resumo-dia")}>Voltar</button>
        </div>
      </div>
    );
  }

  const [vendaAtual, setVendaAtual] = useState(vendaRecebida);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [produtoEditado, setProdutoEditado] = useState(vendaRecebida.produto);
  const [quantidadeEditada, setQuantidadeEditada] = useState(
    vendaRecebida.quantidade,
  );
  const [valorEditado, setValorEditado] = useState(vendaRecebida.valor);
  const [dataEditada, setDataEditada] = useState(vendaRecebida.data);

  function salvarEdicao() {
    const movimentacoesSalvas =
      JSON.parse(localStorage.getItem("movimentacoes")) || [];
    const vendaEditada = {
      ...vendaAtual,
      produto: produtoEditado,
      descricao: `Venda de ${produtoEditado}`,
      quantidade: quantidadeEditada,
      valor: valorEditado,
      data: dataEditada,
    };

    const movimentacoesAtualizadas = movimentacoesSalvas.map((movimentacao) => {
      if (movimentacao.id === vendaAtual.id) {
        return vendaEditada;
      }

      return movimentacao;
    });

    localStorage.setItem(
      "movimentacoes",
      JSON.stringify(movimentacoesAtualizadas),
    );

    setVendaAtual(vendaEditada);
    setModalEditar(false);
  }

  function excluirVenda() {
    const movimentacoesSalvas =
      JSON.parse(localStorage.getItem("movimentacoes")) || [];

    const movimentacoesAtualizadas = movimentacoesSalvas.filter(
      (movimentacao) => movimentacao.id !== vendaAtual.id,
    );

    localStorage.setItem(
      "movimentacoes",
      JSON.stringify(movimentacoesAtualizadas),
    );

    setModalExcluir(false);
    navigate("/resumo-dia");
  }

  return (
    <div className="detalhe-page">
      <div className="detalhe-card">
        <h1>Detalhes da Movimentação</h1>
        <p>Informações completas da movimentação selecionada.</p>

        <div className="detalhe-info">
          <div>
            <strong>Tipo:</strong>
            <span>{vendaAtual.tipo}</span>
          </div>

          <div>
            <strong>Descrição:</strong>
            <span>{vendaAtual.descricao}</span>
          </div>

          <div>
            <strong>Produto:</strong>
            <span>{vendaAtual.produto}</span>
          </div>

          <div>
            <strong>Quantidade:</strong>
            <span>
              {vendaAtual.quantidade} {vendaAtual.unidade}
            </span>
          </div>

          <div>
            <strong>Valor:</strong>
            <span>R$ {vendaAtual.valor}</span>
          </div>

          <div>
            <strong>Pagamento:</strong>
            <span>{vendaAtual.pagamento}</span>
          </div>

          <div>
            <strong>Data:</strong>
            <span>{vendaAtual.data}</span>
          </div>
        </div>

        <div className="detalhe-buttons">
          <button onClick={() => navigate("/resumo-dia")}>Voltar</button>
          <button onClick={() => setModalEditar(true)}>Editar</button>
          <button onClick={() => setModalExcluir(true)}>Excluir</button>
        </div>
      </div>

      {modalExcluir && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir esta movimentação?</p>

            <div className="modal-buttons">
              <button onClick={() => setModalExcluir(false)}>Cancelar</button>

              <button className="confirmar-exclusao" onClick={excluirVenda}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Editar Movimentação</h2>

            <div className="modal-campo">
              <label>Produto:</label>

              <input
                type="text"
                value={produtoEditado}
                onChange={(e) => setProdutoEditado(e.target.value)}
              />
            </div>

            <div className="modal-campo">
              <label>Quantidade:</label>

              <input
                type="number"
                value={quantidadeEditada}
                onChange={(e) => setQuantidadeEditada(e.target.value)}
              />
            </div>

            <div className="modal-campo">
              <label>Valor:</label>

              <input
                type="number"
                value={valorEditado}
                onChange={(e) => setValorEditado(e.target.value)}
              />
            </div>

            <div className="modal-campo">
              <label>Data:</label>

              <input
                type="date"
                value={dataEditada}
                onChange={(e) => setDataEditada(e.target.value)}
              />
            </div>

            <div className="modal-buttons">
              <button onClick={() => setModalEditar(false)}>Cancelar</button>
              <button onClick={salvarEdicao}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
