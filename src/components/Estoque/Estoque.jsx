import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Estoque.css";

export default function Estoque() {
  const navigate = useNavigate();

  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
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
            <input type="text" placeholder="Nome do produto" />
            <input type="number" placeholder="Preço Unitário" />
            <input type="number" placeholder="Quantidade" />

            <select>
              <option>Kg</option>
              <option>Unidade</option>
              <option>Caixa</option>
              <option>Maço</option>
            </select>

            <button type="button">Adicionar</button>
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
              <tr>
                <td>Tomate</td>
                <td>25</td>
                <td>R$ 3,00</td>
                <td>Kg</td>
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
                <td>Banana</td>
                <td>8</td>
                <td>R$ 12,00</td>
                <td>Kg</td>
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
                <td>Alface</td>
                <td>15</td>
                <td>R$ 6,00</td>
                <td>Maço</td>
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

        <button className="voltar-button" onClick={() => navigate("/menu")}>
          Voltar
        </button>
      </div>
      {modalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Editar Produto</h2>

            <input type="text" placeholder="Nome do produto" />
            <input type="number" placeholder="Quantidade" />
            <input type="number" placeholder="Preço Unitário" />

            <select>
              <option>Kg</option>
              <option>Unidade</option>
              <option>Caixa</option>
              <option>Maço</option>
            </select>

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

            <p>Tem certeza que deseja excluir este produto do estoque?</p>

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
