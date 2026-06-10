import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { listar, atualizar, excluir } from "../../services/dadosService";
import { formatarData } from "../../utils/formatters";
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

  async function ajustarEstoqueEdicao(qtdAntiga, qtdNova, nomeProduto) {
    const delta = parseFloat(qtdNova) - parseFloat(qtdAntiga);
    if (delta === 0) return true;

    const estoque = await listar("estoque");
    const item = estoque.find((i) => i.produto === nomeProduto);
    if (!item) return true;

    const qtdEstoque = parseFloat(item.quantidade) || 0;

    if (delta > 0 && delta > qtdEstoque) {
      setErro(`Estoque insuficiente para esta edição. Disponível: ${qtdEstoque} ${item.unidade}`);
      return false;
    }

    await atualizar("estoque", item.id, { quantidade: qtdEstoque - delta });
    return true;
  }

  async function ajustarEstoqueExclusao(quantidade, nomeProduto) {
    const qtdDevolver = parseFloat(quantidade) || 0;
    if (qtdDevolver === 0) return;

    const estoque = await listar("estoque");
    const item = estoque.find((i) => i.produto === nomeProduto);
    if (!item) return;

    await atualizar("estoque", item.id, {
      quantidade: parseFloat(item.quantidade) + qtdDevolver,
    });
  }

  async function salvarEdicao() {
    if (vendaAtual.tipo === "Entrada") {
      const ok = await ajustarEstoqueEdicao(vendaAtual.quantidade, quantidadeEditada, vendaAtual.produto);
      if (!ok) return;
    }

    const dadosEditados = {
      produto: produtoEditado,
      descricao: `Venda de ${produtoEditado}`,
      quantidade: quantidadeEditada,
      valor: valorEditado,
      data: dataEditada,
    };

    await atualizar("movimentacoes", vendaAtual.id, dadosEditados);

    setVendaAtual({ ...vendaAtual, ...dadosEditados });
    setErro("");
    setModalEditar(false);
  }

  async function excluirVenda() {
    if (vendaAtual.tipo === "Entrada") {
      await ajustarEstoqueExclusao(vendaAtual.quantidade, vendaAtual.produto);
    }

    await excluir("movimentacoes", vendaAtual.id);
    navigate("/resumo-dia");
  }

  return (
    <div className="detalhe-page">
      <div className="detalhe-card">
        <h1>Detalhes da Movimentação</h1>
        <p>Informações completas da movimentação selecionada.</p>

        <div className="detalhe-info">
          <div><strong>Tipo:</strong><span>{vendaAtual.tipo}</span></div>
          <div><strong>Descrição:</strong><span>{vendaAtual.descricao}</span></div>
          <div><strong>Produto:</strong><span>{vendaAtual.produto}</span></div>
          <div><strong>Quantidade:</strong><span>{vendaAtual.quantidade} {vendaAtual.unidade}</span></div>
          <div><strong>Valor:</strong><span>R$ {vendaAtual.valor}</span></div>
          <div><strong>Pagamento:</strong><span>{vendaAtual.pagamento}</span></div>
          <div><strong>Data:</strong><span>{formatarData(vendaAtual.data)}</span></div>
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
              <button className="confirmar-exclusao" onClick={excluirVenda}>Excluir</button>
            </div>
          </div>
        </div>
      )}

      {modalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Editar Movimentação</h2>
            <div className="modal-campo"><label>Produto:</label><input type="text" value={produtoEditado} onChange={(e) => setProdutoEditado(e.target.value)} /></div>
            <div className="modal-campo"><label>Quantidade:</label><input type="number" value={quantidadeEditada} onChange={(e) => { setQuantidadeEditada(e.target.value); setErro(""); }} /></div>
            <div className="modal-campo"><label>Valor:</label><input type="number" value={valorEditado} onChange={(e) => setValorEditado(e.target.value)} /></div>
            <div className="modal-campo"><label>Data:</label><input type="date" value={dataEditada} onChange={(e) => setDataEditada(e.target.value)} /></div>
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
