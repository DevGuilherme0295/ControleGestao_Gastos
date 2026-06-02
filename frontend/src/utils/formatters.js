// "2026-05-28" → "28/05/2026"
export function formatarData(dataISO) {
  if (!dataISO) return "—";
  return dataISO.split("-").reverse().join("/");
}

// 25.5 → "R$ 25.50"
export function formatarMoeda(valor) {
  return `R$ ${Number(valor).toFixed(2)}`;
}

// Retorna a data de hoje no formato "YYYY-MM-DD" usando horário local (evita bug de fuso UTC)
export function getHoje() {
  const agora = new Date();
  return [
    agora.getFullYear(),
    String(agora.getMonth() + 1).padStart(2, "0"),
    String(agora.getDate()).padStart(2, "0"),
  ].join("-");
}

// "2026-05" → "Maio 2026"
import { MESES } from "./constants";
export function labelMes(anoMes) {
  const [ano, mes] = anoMes.split("-");
  return `${MESES[Number(mes) - 1]} ${ano}`;
}
