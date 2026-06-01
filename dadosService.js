import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { atualizar, criar, listar } from "../../services/dadosService";
import { dataAtualISO, horaAtual, numeroPositivo } from "../../utils/formatadores";
import "./RegistroVendas.css";

export default function RegistroVendas() {
  const navigate = useNavigate();

  const [estoqueItens, setEstoqueItens] = useState([]);
  const [produto, setProduto] = useState("");
  const [produtoManual, setProdutoManual] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("Kg");
  const [valor, setValor] = useState("");
  const [pagamento, setPagamento] = useState("Dinheiro");
  const [data, setData] = useState(dataAtualISO());
  const [erro, setErro] = useState("");

  useEffect(() => {
    listar("estoque").then(setEstoqueItens);
  }, []);

  function handleSelecionarProduto(e) {
    const valor = e.target.value;
    setProduto(valor);
    setErro("");

    const item = estoqueItens.find((i) => i.produto === valor);
    if (item) {
      setUnidade(item.unidade);
    }
  }

  const itemSelecionado = estoqueItens.find((i) => i.produto === produto);
  const nomeProdutoFinal = produto === "outro" ? produtoManual : produto;

  async function registrarVenda() {
    if (!nomeProdutoFinal || !quantidade || !valor || !data) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!numeroPositivo(quantidade)) {
      setErro("A quantidade deve ser maior que zero.");
      return;
    }

    if (!numeroPositivo(valor)) {
      setErro("O valor da venda deve ser maior que zero.");
      return;
    }

    const qtdVendida = parseFloat(quantidade);

    if (produto !== "outro" && itemSelecionado) {
      const qtdEstoque = parseFloat(itemSelecionado.quantidade);

      if (qtdVendida > qtdEstoque) {
        setErro(
          `Estoque insuficiente. Disponível: ${qtdEstoque} ${itemSelecionado.unidade}`
        );
        return;
      }

      const estoqueAtualizado = estoqueItens.map((i) =>
        i.id === itemSelecionado.id
          ? { ...i, quantidade: qtdEstoque - qtdVendida }
          : i
      );

      await atualizar(
        "estoque",
        itemSelecionado.id,
        estoqueAtualizado.find((i) => i.id === itemSelecionado.id)
      );
      setEstoqueItens(estoqueAtualizado);
    }

    const novaVenda = {
      id: Date.now(),
      tipo: "Entrada",
      produto: nomeProdutoFinal,
      descricao: `Venda de ${nomeProdutoFinal}`,
      quantidade,
      unidade,
      valor,
      pagamento,
      data,
      horario: horaAtual(),
    };

    await criar("movimentacoes", novaVenda);

    alert("Venda registrada com sucesso!");

    setErro("");
    setProduto("");
    setProdutoManual("");
    setQuantidade("");
    setUnidade("Kg");
    setValor("");
    setPagamento("Dinheiro");
    setData(dataAtualISO());
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
            onChange={(e) => {
              setQuantidade(e.target.value);
              setErro("");
            }}
          />

          <label>Unidade</label>
          <select value={unidade} onChange={(e) => setUnidade(e.target.value)}>
            <option>Kg</option>
            <option>Unidade</option>
            <option>Caixa</option>
            <option>Maço</option>
            <option>Litro</option>
          </select>

          <label>Valor da venda</label>
          <input
            type="number"
            placeholder="Ex: 25.00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <label>Forma de pagamento</label>
          <select
            value={pagamento}
            onChange={(e) => setPagamento(e.target.value)}
          >
            <option>Dinheiro</option>
            <option>Pix</option>
            <option>Cartão de débito</option>
            <option>Cartão de crédito</option>
          </select>

          <label>Data da venda</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          {erro && <p className="erro-msg">{erro}</p>}

          <div className="vendas-buttons">
            <button type="button" onClick={() => navigate("/menu")}>
              Voltar
            </button>
            <button type="button" onClick={registrarVenda}>
              Registrar Venda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
