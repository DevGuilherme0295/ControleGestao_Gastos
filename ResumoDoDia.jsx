import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { atualizar, criar, listar, remover } from "../../services/dadosService";
import {
  dataAtualISO,
  formatarMoeda,
  horaAtual,
  numeroPositivo,
} from "../../utils/formatadores";
import "./GastosDespesas.css";

export default function GastosDespesas() {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Compra de mercadorias");
  const [valor, setValor] = useState("");
  const [pagamento, setPagamento] = useState("Dinheiro");
  const [data, setData] = useState(dataAtualISO());
  const [erro, setErro] = useState("");

  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [gastoSelecionado, setGastoSelecionado] = useState(null);

  const [descricaoEditada, setDescricaoEditada] = useState("");
  const [categoriaEditada, setCategoriaEditada] = useState("");
  const [valorEditado, setValorEditado] = useState("");
  const [pagamentoEditado, setPagamentoEditado] = useState("");
  const [dataEditada, setDataEditada] = useState("");

  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    listar("movimentacoes").then((movimentacoesSalvas) => {
      setGastos(movimentacoesSalvas.filter((item) => item.tipo === "Saída"));
    });
  }, []);

  async function registrarGasto() {
    if (!descricao || !categoria || !valor || !pagamento || !data) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!numeroPositivo(valor)) {
      setErro("O valor gasto deve ser maior que zero.");
      return;
    }

    const novoGasto = {
      id: Date.now(),
      tipo: "Saída",
      descricao,
      categoria,
      valor,
      pagamento,
      data,
      horario: horaAtual(),
    };

    const gastoSalvo = await criar("movimentacoes", novoGasto);
    setGastos((gastosAtuais) => [...gastosAtuais, gastoSalvo]);

    setDescricao("");
    setValor("");
    setPagamento("Dinheiro");
    setData(dataAtualISO());
    setErro("");

    alert("Gasto registrado com sucesso!");
  }

  function abrirEditar(gasto) {
    setGastoSelecionado(gasto);
    setDescricaoEditada(gasto.descricao);
    setCategoriaEditada(gasto.categoria);
    setValorEditado(gasto.valor);
    setPagamentoEditado(gasto.pagamento);
    setDataEditada(gasto.data);
    setModalEditar(true);
  }

  function abrirExcluir(gasto) {
    setGastoSelecionado(gasto);
    setModalExcluir(true);
  }

  async function salvarEdicao() {
    if (!descricaoEditada || !categoriaEditada || !valorEditado || !dataEditada) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    if (!numeroPositivo(valorEditado)) {
      setErro("O valor gasto deve ser maior que zero.");
      return;
    }

    const gastoEditado = {
      ...gastoSelecionado,
      descricao: descricaoEditada,
      categoria: categoriaEditada,
      valor: valorEditado,
      pagamento: pagamentoEditado,
      data: dataEditada,
    };

    await atualizar("movimentacoes", gastoSelecionado.id, gastoEditado);

    setGastos((gastosAtuais) =>
      gastosAtuais.map((gasto) =>
        gasto.id === gastoSelecionado.id ? gastoEditado : gasto
      )
    );

    setErro("");
    setModalEditar(false);
  }

  async function excluirGasto() {
    await remover("movimentacoes", gastoSelecionado.id);

    setGastos((gastosAtuais) =>
      gastosAtuais.filter((gasto) => gasto.id !== gastoSelecionado.id)
    );

    setModalExcluir(false);
  }

  return (
    <div className="gastos-page">
      <div className="gastos-container">
        <div className="gastos-card">
          <h1>Gastos / Despesas</h1>
          <p>Registre tudo que saiu de dinheiro no negócio.</p>

          <form className="gastos-form">
            <div className="gastos-campo">
              <label>Descrição do gasto</label>
              <input
                type="text"
                placeholder="Ex: Compra de Mercadoria"
                value={descricao}
                onChange={(e) => {
                  setDescricao(e.target.value);
                  setErro("");
                }}
              />
            </div>

            <div className="gastos-campo">
              <label>Categoria</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="Compra de mercadorias">Compra de mercadorias</option>
                <option value="Transporte">Transporte</option>
                <option value="Embalagem">Embalagem</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="gastos-campo">
              <label>Valor</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Ex: 120.00"
                value={valor}
                onChange={(e) => {
                  setValor(e.target.value);
                  setErro("");
                }}
              />
            </div>

            <div className="gastos-campo">
              <label>Pagamento</label>
              <select
                value={pagamento}
                onChange={(e) => setPagamento(e.target.value)}
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
              </select>
            </div>

            <div className="gastos-campo">
              <label>Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            {erro && <p className="erro-msg">{erro}</p>}

            <div className="gastos-buttons">
              <button type="button" onClick={() => navigate("/menu")}>
                Voltar
              </button>

              <button type="button" onClick={registrarGasto}>
                Registrar Gasto
              </button>
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
              {gastos.map((gasto) => (
                <tr key={gasto.id}>
                  <td>{gasto.descricao}</td>
                  <td>{gasto.categoria}</td>
                  <td>{formatarMoeda(gasto.valor)}</td>
                  <td>{gasto.pagamento}</td>
                  <td>{gasto.data}</td>
                  <td>
                    <div className="acoes-buttons">
                      <button
                        className="editar-button"
                        onClick={() => abrirEditar(gasto)}
                      >
                        Editar
                      </button>

                      <button
                        className="excluir-button"
                        onClick={() => abrirExcluir(gasto)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Editar Gasto</h2>

            <div className="modal-campo">
              <label>Descrição</label>
              <input
                type="text"
                value={descricaoEditada}
                onChange={(e) => setDescricaoEditada(e.target.value)}
              />
            </div>

            <div className="modal-campo">
              <label>Categoria</label>
              <select
                value={categoriaEditada}
                onChange={(e) => setCategoriaEditada(e.target.value)}
              >
                <option value="Compra de mercadorias">Compra de mercadorias</option>
                <option value="Transporte">Transporte</option>
                <option value="Embalagem">Embalagem</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="modal-campo">
              <label>Valor</label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={valorEditado}
                onChange={(e) => setValorEditado(e.target.value)}
              />
            </div>

            <div className="modal-campo">
              <label>Forma de pagamento</label>
              <select
                value={pagamentoEditado}
                onChange={(e) => setPagamentoEditado(e.target.value)}
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
              </select>
            </div>

            <div className="modal-campo">
              <label>Data</label>
              <input
                type="date"
                value={dataEditada}
                onChange={(e) => setDataEditada(e.target.value)}
              />
            </div>

            {erro && <p className="erro-msg">{erro}</p>}

            <div className="modal-buttons">
              <button onClick={() => setModalEditar(false)}>Cancelar</button>
              <button onClick={salvarEdicao}>Salvar</button>
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
              <button className="confirmar-exclusao" onClick={excluirGasto}>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
