import { db } from "./firebase";
import {
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Usa o campo `id` (Date.now()) de cada objeto como ID do documento no Firestore.
// Assim manter compatibilidade com o código existente que referencia por id numérico.

export async function listar(colecao) {
  const snapshot = await getDocs(collection(db, colecao));
  return snapshot.docs.map((d) => d.data());
}

export async function criar(colecao, dados) {
  await setDoc(doc(db, colecao, String(dados.id)), dados);
  return dados;
}

export async function atualizar(colecao, id, dados) {
  await updateDoc(doc(db, colecao, String(id)), dados);
  return dados;
}

export async function excluir(colecao, id) {
  await deleteDoc(doc(db, colecao, String(id)));
}
