import { useNavigate } from "react-router-dom";
import "./RegistroVendas.css";

export default function RegistroVendas() {
  const navigate = useNavigate();

  return (
    <div className="vendas-page">
      <div className="vendas-card">
        <h1>Registro de Vendas</h1>
        <p>Preencha os dados básicos da venda realizada.</p>

        <form className="vendas-form">
          <label>Produto vendido</label>
          <input type="text" placeholder="Ex: Tomate, banana, alface" />

          <label>Quantidade</label>
          <input type="number" placeholder="Ex: 5" />

          <label>Unidade</label>
          <select>
            <option>Kg</option>
            <option>Unidade</option>
            <option>Caixa</option>
            <option>Maço</option>
          </select>

          <label>Valor da venda</label>
          <input type="number" placeholder="Ex: 25.00" />

          <label>Forma de pagamento</label>
          <select>
            <option>Dinheiro</option>
            <option>Pix</option>
            <option>Cartão de débito</option>
            <option>Cartão de crédito</option>
          </select>

          <label>Data da venda</label>
          <input type="date" />

          <div className="vendas-buttons">
            <button type="button" onClick={() => navigate("/menu")}>
              Voltar
            </button>

            <button type="button">
              Registrar Venda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}