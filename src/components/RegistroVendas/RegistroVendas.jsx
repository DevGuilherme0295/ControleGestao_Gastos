import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistroVendas.css";

export default function RegistroVendas() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("Kg");
  const [valor, setValor] = useState("");
  const [pagamento, setPagamento] = useState("Dinheiro");
  const [data, setData] = useState("");

  function registrarVenda() {
    const novaVenda = {
      id: Date.now(),
      tipo: "Entrada",
      produto,
      descricao: `Venda de ${produto}`,
      quantidade,
      unidade,
      valor,
      pagamento,
      data,
    };

    const movimentacoesSalvas = JSON.parse(localStorage.getItem("movimentacoes")) || [];
    const movimentacoesAtualizadas = [...movimentacoesSalvas, novaVenda];

    localStorage.setItem( "movimentacoes", JSON.stringify(movimentacoesAtualizadas),);

    alert("Venda registrada com sucesso!");

    setProduto("");
    setQuantidade("");
    setUnidade("Kg");
    setValor("");
    setPagamento("Dinheiro");
    setData("");
  }

  return (
    <div className="vendas-page">
      <div className="vendas-card">
        <h1>Registro de Vendas</h1>
        <p>Preencha os dados básicos da venda realizada.</p>

        <form className="vendas-form">
          <label>Produto vendido</label>
          <input
            type="text"
            placeholder="Ex: Tomate, banana, alface"
            value={produto}
            onChange={(e) => setProduto(e.target.value)}
          />

          <label>Quantidade</label>
          <input
            type="number"
            placeholder="Ex: 5"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />

          <label>Unidade</label>
          <select value={unidade} onChange={(e) => setUnidade(e.target.value)}>
            <option>Kg</option>
            <option>Unidade</option>
            <option>Caixa</option>
            <option>Maço</option>
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
