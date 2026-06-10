import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listar, criar, atualizar, excluir } from "../../services/dadosService";
import { FORMAS_PAGAMENTO, CATEGORIAS_GASTO } from "../../utils/constants";
import { formatarData, formatarMoeda, getHoje } from "../../utils/formatters";
import "./GastosDespesas.css";

export default function GastosDespesas() {
  const navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState(CATEGORIAS_GASTO[0]);
  const [valor, setValor] = useState("");
  const [pagamento, setPagamento] = useState(FORMAS_PAGAMENTO[0]);
  const [data, setData] = useState(getHoje());

  const [gastos, setGastos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [gastoSelecionado, setGastoSelecionado] = useState(null);

  const [descricaoEditada, setDescricaoEditada] = useState("");
  const [categoriaEditada, setCategoriaEditada] = useState("");
  const [valorEditado, setValorEditado] = useState("");
  const [pagamentoEditado, setPagamentoEditado] = useState("");
  const [dataEditada, setDataEditada] = useState("");

  useEffect(() => {
    carregarGastos();
  }, []);

  async function carregarGastos() {
    setCarregando(true);
    const todas = await listar("movimentacoes");
    setGastos(todas.filter((m) => m.tipo === "Saída"));
    setCarregando(false);
  }

  async function registrarGasto() {
    if (!descricao || !valor || !data) {
      alert("Preencha todos os campos.");
      return;
    }

    await criar("movimentacoes", {
      id: Date.now(),
      tipo: "Saída",
      descricao,
      categoria,
      valor,
      pagamento,
      data,
    });

    await carregarGastos();
    alert("Gasto registrado com sucesso!");

    setDescricao("");
    setCategoria(CATEGORIAS_GASTO[0]);
    setValor("");
    setPagamento(FORMAS_PAGAMENTO[0]);
    setData(getHoje());
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

  async function salvarEdicao() {
    await atualizar("movimentacoes", gastoSelecionado.id, {
      descricao: descricaoEditada,
      categoria: categoriaEditada,
      valor: valorEditado,
      pagamento: pagamentoEditado,
      data: dataEditada,
    });
    await carregarGastos();
    setModalEditar(false);
  }

  function abrirExcluir(gasto) {
    setGastoSelecionado(gasto);
    setModalExcluir(true);
  }

  async function excluirGasto() {
    await excluir("movimentacoes", gastoSelecionado.id);
    await carregarGastos();
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
              <input type="text" placeholder="Ex: Compra de Mercadoria" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <div className="gastos-campo">
              <label>Categoria</label>
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                {CATEGORIAS_GASTO.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="gastos-campo">
              <label>Valor</label>
              <input type="number" placeholder="Ex: 120.00" value={valor} onChange={(e) => setValor(e.target.value)} />
            </div>
            <div className="gastos-campo">
              <label>Pagamento</label>
              <select value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
                {FORMAS_PAGAMENTO.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="gastos-campo">
              <label>Data</label>
              <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
            </div>
            <div className="gastos-buttons">
              <button type="button" onClick={() => navigate("/menu")}>Voltar</button>
              <button type="button" onClick={registrarGasto}>Registrar Gasto</button>
            </div>
          </form>
        </div>

        <div className="gastos-lista">
          <h2>Gastos cadastrados</h2>
          {carregando ? (
            <p style={{ color: "#888", textAlign: "center", padding: "24px" }}>Carregando...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Descrição</th><th>Categoria</th><th>Valor</th><th>Pagamento</th><th>Data</th><th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {gastos.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", color: "#888", padding: "24px" }}>
                      Nenhum gasto cadastrado.
                    </td>
                  </tr>
                ) : (
                  gastos.map((gasto) => (
                    <tr key={gasto.id}>
                      <td>{gasto.descricao}</td>
                      <td>{gasto.categoria}</td>
                      <td>{formatarMoeda(gasto.valor)}</td>
                      <td>{gasto.pagamento}</td>
                      <td>{formatarData(gasto.data)}</td>
                      <td>
                        <div className="acoes-buttons">
                          <button className="editar-button" onClick={() => abrirEditar(gasto)}>Editar</button>
                          <button className="excluir-button" onClick={() => abrirExcluir(gasto)}>Excluir</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalEditar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Editar Gasto</h2>
            <div className="modal-campo"><label>Descrição</label><input type="text" value={descricaoEditada} onChange={(e) => setDescricaoEditada(e.target.value)} /></div>
            <div className="modal-campo">
              <label>Categoria</label>
              <select value={categoriaEditada} onChange={(e) => setCategoriaEditada(e.target.value)}>
                {CATEGORIAS_GASTO.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="modal-campo"><label>Valor</label><input type="number" value={valorEditado} onChange={(e) => setValorEditado(e.target.value)} /></div>
            <div className="modal-campo">
              <label>Forma de pagamento</label>
              <select value={pagamentoEditado} onChange={(e) => setPagamentoEditado(e.target.value)}>
                {FORMAS_PAGAMENTO.map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="modal-campo"><label>Data</label><input type="date" value={dataEditada} onChange={(e) => setDataEditada(e.target.value)} /></div>
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
              <button className="confirmar-exclusao" onClick={excluirGasto}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
