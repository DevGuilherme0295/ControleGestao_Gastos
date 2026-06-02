import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEstoque, saveEstoque, getMovimentacoes, saveMovimentacoes } from "../../utils/storage";
import { UNIDADES, FORMAS_PAGAMENTO } from "../../utils/constants";
import { getHoje } from "../../utils/formatters";
import "./RegistroVendas.css";

export default function RegistroVendas() {
  const navigate = useNavigate();

  const [estoqueItens, setEstoqueItens] = useState([]);
  const [produto, setProduto] = useState("");
  const [produtoManual, setProdutoManual] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState(UNIDADES[0]);
  const [valor, setValor] = useState("");
  const [pagamento, setPagamento] = useState(FORMAS_PAGAMENTO[0]);
  const [data, setData] = useState(getHoje());
  const [erro, setErro] = useState("");

  useEffect(() => {
    setEstoqueItens(getEstoque());
  }, []);

  function handleSelecionarProduto(e) {
    const val = e.target.value;
    setProduto(val);
    setErro("");

    const item = estoqueItens.find((i) => i.produto === val);
    if (item) setUnidade(item.unidade);
  }

  const itemSelecionado = estoqueItens.find((i) => i.produto === produto);
  const nomeProdutoFinal = produto === "outro" ? produtoManual : produto;

  function registrarVenda() {
    if (!nomeProdutoFinal || !quantidade || !valor || !data) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    const qtdVendida = parseFloat(quantidade);

    if (produto !== "outro" && itemSelecionado) {
      const qtdEstoque = parseFloat(itemSelecionado.quantidade);

      if (qtdVendida > qtdEstoque) {
        setErro(`Estoque insuficiente. Disponível: ${qtdEstoque} ${itemSelecionado.unidade}`);
        return;
      }

      const estoqueAtualizado = estoqueItens.map((i) =>
        i.id === itemSelecionado.id ? { ...i, quantidade: qtdEstoque - qtdVendida } : i
      );
      saveEstoque(estoqueAtualizado);
      setEstoqueItens(estoqueAtualizado);
    }

    saveMovimentacoes([
      ...getMovimentacoes(),
      {
        id: Date.now(),
        tipo: "Entrada",
        produto: nomeProdutoFinal,
        descricao: `Venda de ${nomeProdutoFinal}`,
        quantidade,
        unidade,
        valor,
        pagamento,
        data,
      },
    ]);

    alert("Venda registrada com sucesso!");
    setErro("");
    setProduto("");
    setProdutoManual("");
    setQuantidade("");
    setUnidade(UNIDADES[0]);
    setValor("");
    setPagamento(FORMAS_PAGAMENTO[0]);
    setData(getHoje());
  }

  return (
    <div className="vendas-page">
      <div className="vendas-card">
        <h1>Registro de Vendas</h1>
        <p>Preencha os dados básicos da venda realizada.</p>

        <form className="vendas-form">
          <label>Produto vendido</label>
          <select value={produto} onChange={handleSelecionarProduto}>
            <option value="">Selecione um produto</option>
            {estoqueItens.map((item) => (
              <option key={item.id} value={item.produto}>
                {item.produto} — {item.quantidade} {item.unidade} disponíveis
              </option>
            ))}
            <option value="outro">Outro produto (não cadastrado)</option>
          </select>

          {produto === "outro" && (
            <>
              <label>Nome do produto</label>
              <input
                type="text"
                placeholder="Ex: Tomate, banana, alface"
                value={produtoManual}
                onChange={(e) => setProdutoManual(e.target.value)}
              />
            </>
          )}

          {itemSelecionado && (
            <p className="estoque-info">
              Estoque atual: <strong>{itemSelecionado.quantidade} {itemSelecionado.unidade}</strong>
            </p>
          )}

          <label>Quantidade</label>
          <input
            type="number"
            placeholder="Ex: 5"
            value={quantidade}
            onChange={(e) => { setQuantidade(e.target.value); setErro(""); }}
          />

          <label>Unidade</label>
          <select value={unidade} onChange={(e) => setUnidade(e.target.value)}>
            {UNIDADES.map((u) => <option key={u}>{u}</option>)}
          </select>

          <label>Valor da venda</label>
          <input
            type="number"
            placeholder="Ex: 25.00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <label>Forma de pagamento</label>
          <select value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
            {FORMAS_PAGAMENTO.map((f) => <option key={f}>{f}</option>)}
          </select>

          <label>Data da venda</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          {erro && <p className="erro-msg">{erro}</p>}

          <div className="vendas-buttons">
            <button type="button" onClick={() => navigate("/menu")}>Voltar</button>
            <button type="button" onClick={registrarVenda}>Registrar Venda</button>
          </div>
        </form>
      </div>
    </div>
  );
}
