import { useNavigate } from "react-router-dom";
import "./GastosDespesas.css";

export default function GastosDespesas() {
  const navigate = useNavigate();

  return (
    <div className="gastos-page">
      <div className="gastos-card">
        <h1>Gastos / Despesas</h1>
        <p>Registre tudo que saiu de dinheiro no negócio.</p>

        <form className="gastos-form">
          <label>Descrição do gasto</label>
          <input type="text" placeholder="Ex: Compra de tomate, gasolina, sacolas" />

          <label>Categoria</label>
          <select>
            <option>Compra de mercadoria</option>
            <option>Transporte</option>
            <option>Embalagens</option>
            <option>Alimentação</option>
            <option>Ajudante</option>
            <option>Taxas da feira</option>
            <option>Outros</option>
          </select>

          <label>Valor do gasto</label>
          <input type="number" placeholder="Ex: 120.00" />

          <label>Forma de pagamento</label>
          <select>
            <option>Dinheiro</option>
            <option>Pix</option>
            <option>Cartão de débito</option>
            <option>Cartão de crédito</option>
          </select>

          <label>Data do gasto</label>
          <input type="date" />

          <div className="gastos-buttons">
            <button type="button" onClick={() => navigate("/menu")}>
              Voltar
            </button>

            <button type="button">
              Registrar Gasto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}