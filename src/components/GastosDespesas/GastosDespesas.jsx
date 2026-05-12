import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GastosDespesas.css";

export default function GastosDespesas() {
  const navigate = useNavigate();

  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  return (
    <div className="gastos-page">
      <div className="gastos-container">
        <div className="gastos-card">
          <h1>Gastos / Despesas</h1>

          <p>Registre tudo que saiu de dinheiro no negócio.</p>

          <form className="gastos-form">
            <div className="gastos-campo">
              <label>Descrição do gasto</label>

              <input type="text" placeholder="Ex: Compra de tomate" />
            </div>

            <div className="gastos-campo">
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
            </div>

            <div className="gastos-campo">
              <label>Valor</label>

              <input type="number" placeholder="Ex: 120.00" />
            </div>

            <div className="gastos-campo">
              <label>Pagamento</label>

              <select>
                <option>Dinheiro</option>
                <option>Pix</option>
                <option>Cartão de débito</option>
                <option>Cartão de crédito</option>
              </select>
            </div>

            <div className="gastos-campo">
              <label>Data</label>

              <input type="date" />
            </div>

            <div className="gastos-buttons">
              <button type="button" onClick={() => navigate("/menu")}>
                Voltar
              </button>

              <button type="button">Registrar Gasto</button>
            </div>
          </form>
        </div>

        <div className="gastos-lista">
          <h2>Gastos cadastrados</h2>

          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Valor</th>
                <th>Pagamento</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Compra de tomate</td>
                <td>Mercadoria</td>
                <td>R$ 120,00</td>
                <td>Pix</td>
                <td>12/05/2026</td>

                <td>
                  <div className="acoes-buttons">
                    <button
                      className="editar-button"
                      onClick={() => setModalEditar(true)}
                    >
                      Editar
                    </button>

                    <button
                      className="excluir-button"
                      onClick={() => setModalExcluir(true)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>Gasolina</td>
                <td>Transporte</td>
                <td>R$ 70,00</td>
                <td>Dinheiro</td>
                <td>12/05/2026</td>

                <td>
                  <div className="acoes-buttons">
                    <button
                      className="editar-button"
                      onClick={() => setModalEditar(true)}
                    >
                      Editar
                    </button>

                    <button
                      className="excluir-button"
                      onClick={() => setModalExcluir(true)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>Sacolas plásticas</td>
                <td>Embalagens</td>
                <td>R$ 35,00</td>
                <td>Cartão de débito</td>
                <td>11/05/2026</td>

                <td>
                  <div className="acoes-buttons">
                    <button
                      className="editar-button"
                      onClick={() => setModalEditar(true)}
                    >
                      Editar
                    </button>

                    <button
                      className="excluir-button"
                      onClick={() => setModalExcluir(true)}
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {modalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Editar Gasto</h2>

            <input type="text" placeholder="Descrição do gasto" />

            <select>
              <option>Compra de mercadoria</option>
              <option>Transporte</option>
              <option>Embalagens</option>
              <option>Alimentação</option>
              <option>Ajudante</option>
              <option>Taxas da feira</option>
              <option>Outros</option>
            </select>

            <input type="number" placeholder="Valor do gasto" />

            <select>
              <option>Dinheiro</option>
              <option>Pix</option>
              <option>Cartão de débito</option>
              <option>Cartão de crédito</option>
            </select>

            <input type="date" />

            <div className="modal-buttons">
              <button onClick={() => setModalEditar(false)}>Cancelar</button>

              <button onClick={() => setModalEditar(false)}>Salvar</button>
            </div>
          </div>
        </div>
      )}
      {modalExcluir && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Confirmar Exclusão</h2>

            <p>Tem certeza que deseja excluir este gasto/despesa?</p>

            <div className="modal-buttons">
              <button onClick={() => setModalExcluir(false)}>Cancelar</button>

              <button
                className="confirmar-exclusao"
                onClick={() => setModalExcluir(false)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
