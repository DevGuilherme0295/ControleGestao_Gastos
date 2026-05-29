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
  const [erro, setErro] = useState("");

  const [produtoEditado, setProdutoEditado] = useState(vendaRecebida.produto);
  const [quantidadeEditada, setQuantidadeEditada] = useState(vendaRecebida.quantidade);
  const [valorEditado, setValorEditado] = useState(vendaRecebida.valor);
  const [dataEditada, setDataEditada] = useState(vendaRecebida.data);

  function ajustarEstoqueEdicao(qtdAntiga, qtdNova, nomeProduto) {
    const delta = parseFloat(qtdNova) - parseFloat(qtdAntiga);
    if (delta === 0) return true;

    const estoqueAtual = JSON.parse(localStorage.getItem("estoque")) || [];
    const idx = estoqueAtual.findIndex((i) => i.produto === nomeProduto);

    if (idx === -1) return true; // produto não está no estoque, ignora

    const qtdEstoque = parseFloat(estoqueAtual[idx].quantidade) || 0;

    if (delta > 0 && delta > qtdEstoque) {
      setErro(
        `Estoque insuficiente para esta edição. Disponível: ${qtdEstoque} ${estoqueAtual[idx].unidade}`
      );
      return false;
    }

    estoqueAtual[idx] = {
      ...estoqueAtual[idx],
      quantidade: qtdEstoque - delta,
    };
    localStorage.setItem("estoque", JSON.stringify(estoqueAtual));
    return true;
  }

  function ajustarEstoqueExclusao(quantidade, nomeProduto) {
    const qtdDevolver = parseFloat(quantidade) || 0;
    if (qtdDevolver === 0) return;

    const estoqueAtual = JSON.parse(localStorage.getItem("estoque")) || [];
    const idx = estoqueAtual.findIndex((i) => i.produto === nomeProduto);

    if (idx === -1) return; // produto não está no estoque, ignora

    estoqueAtual[idx] = {
      ...estoqueAtual[idx],
      quantidade: parseFloat(estoqueAtual[idx].quantidade) + qtdDevolver,
    };
    localStorage.setItem("estoque", JSON.stringify(estoqueAtual));
  }

  function salvarEdicao() {
    // Se for Entrada (venda), ajusta o estoque antes de salvar
    if (vendaAtual.tipo === "Entrada") {
      const ok = ajustarEstoqueEdicao(
        vendaAtual.quantidade,
        quantidadeEditada,
        vendaAtual.produto
      );
      if (!ok) return;
    }

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

    const movimentacoesAtualizadas = movimentacoesSalvas.map((m) =>
      m.id === vendaAtual.id ? vendaEditada : m
    );

    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoesAtualizadas));

    setVendaAtual(vendaEditada);
    setErro("");
    setModalEditar(false);
  }

  function excluirVenda() {
    // Se for Entrada (venda), devolve a quantidade ao estoque
    if (vendaAtual.tipo === "Entrada") {
      ajustarEstoqueExclusao(vendaAtual.quantidade, vendaAtual.produto);
    }

    const movimentacoesSalvas =
      JSON.parse(localStorage.getItem("movimentacoes")) || [];

    const movimentacoesAtualizadas = movimentacoesSalvas.filter(
      (m) => m.id !== vendaAtual.id
    );

    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoesAtualizadas));

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
            <span>{vendaAtual.quantidade} {vendaAtual.unidade}</span>
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
          <button onClick={() => { setErro(""); setModalEditar(true); }}>Editar</button>
          <button onClick={() => setModalExcluir(true)}>Excluir</button>
        </div>
      </div>

      {modalExcluir && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Confirmar Exclusão</h2>
            <p>
              Tem certeza que deseja excluir esta movimentação?
              {vendaAtual.tipo === "Entrada" && vendaAtual.produto && (
                <><br /><strong>{vendaAtual.quantidade} {vendaAtual.unidade}</strong> de <strong>{vendaAtual.produto}</strong> serão devolvidos ao estoque.</>
              )}
            </p>
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
                onChange={(e) => { setQuantidadeEditada(e.target.value); setErro(""); }}
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

            {erro && <p className="erro-msg">{erro}</p>}

            <div className="modal-buttons">
              <button onClick={() => { setModalEditar(false); setErro(""); }}>Cancelar</button>
              <button onClick={salvarEdicao}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
