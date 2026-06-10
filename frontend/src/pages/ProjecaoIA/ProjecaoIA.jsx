import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { listar } from "../../services/dadosService";
import { gerarProjecao } from "../../services/geminiService";
import "./ProjecaoIA.css";

export default function ProjecaoIA() {
  const navigate = useNavigate();

  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleGerarProjecao() {
    setCarregando(true);
    setErro("");
    setResposta("");

    try {
      const movimentacoes = await listar("movimentacoes");

      if (movimentacoes.length === 0) {
        setErro("Nenhuma movimentação encontrada. Registre vendas e gastos primeiro para gerar uma projeção.");
        return;
      }

      const resultado = await gerarProjecao(movimentacoes);
      setResposta(resultado);
    } catch (e) {
      setErro(e.message || "Erro ao gerar projeção. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  // Converte markdown básico (negrito e quebras) para HTML
  function formatarResposta(texto) {
    return texto
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>");
  }

  return (
    <div className="ia-page">
      <div className="ia-container">

        <div className="ia-header">
          <div>
            <h1><Sparkles size={30} className="ia-icon" /> Projeção com IA</h1>
            <p>Análise financeira e projeção para o próximo mês com base no seu histórico.</p>
          </div>
          <button className="voltar-button" onClick={() => navigate("/menu")}>
            Voltar
          </button>
        </div>

        <div className="ia-info">
          <p>
            🤖 A inteligência artificial vai analisar suas movimentações e gerar uma
            projeção de custos e receitas para o próximo mês, além de dicas práticas
            para melhorar o resultado do seu negócio.
          </p>
        </div>

        {!resposta && !carregando && (
          <div className="ia-center">
            <button className="ia-btn-gerar" onClick={handleGerarProjecao}>
              <Sparkles size={20} />
              Gerar Projeção
            </button>
          </div>
        )}

        {carregando && (
          <div className="ia-loading">
            <div className="ia-spinner" />
            <p>Analisando seus dados financeiros...</p>
          </div>
        )}

        {erro && (
          <div className="ia-erro">
            <p>{erro}</p>
            <button onClick={handleGerarProjecao}>Tentar novamente</button>
          </div>
        )}

        {resposta && (
          <div className="ia-resposta">
            <div className="ia-resposta-header">
              <Sparkles size={18} />
              <span>Análise gerada pela IA</span>
            </div>
            <div
              className="ia-resposta-texto"
              dangerouslySetInnerHTML={{ __html: `<p>${formatarResposta(resposta)}</p>` }}
            />
            <button className="ia-btn-regerar" onClick={handleGerarProjecao}>
              Gerar nova análise
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
