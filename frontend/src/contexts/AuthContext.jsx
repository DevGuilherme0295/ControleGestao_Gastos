import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../services/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Mantém o usuário logado ao recarregar a página
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const perfilDoc = await getDoc(doc(db, "usuarios", firebaseUser.uid));
        if (perfilDoc.exists()) {
          setUsuario({ uid: firebaseUser.uid, ...perfilDoc.data() });
        }
      } else {
        setUsuario(null);
      }
      setCarregando(false);
    });

    return unsubscribe;
  }, []);

  async function entrar(email, senha) {
    const { user } = await signInWithEmailAndPassword(auth, email, senha);
    const perfilDoc = await getDoc(doc(db, "usuarios", user.uid));
    setUsuario({ uid: user.uid, ...perfilDoc.data() });
  }

  async function cadastrar(nome, email, senha) {
    const { user } = await createUserWithEmailAndPassword(auth, email, senha);

    // Primeiro usuário cadastrado vira admin
    const snapshot = await getDocs(collection(db, "usuarios"));
    const isAdmin = snapshot.empty;

    const perfil = { nome, email, isAdmin };
    await setDoc(doc(db, "usuarios", user.uid), perfil);
    setUsuario({ uid: user.uid, ...perfil });
  }

  async function sair() {
    await signOut(auth);
    setUsuario(null);
  }

  async function recuperarSenha(email) {
    await sendPasswordResetEmail(auth, email);
  }

  async function atualizarPerfil(uid, dados) {
    await updateDoc(doc(db, "usuarios", uid), dados);
    if (uid === usuario?.uid) {
      setUsuario((prev) => ({ ...prev, ...dados }));
    }
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, entrar, cadastrar, sair, recuperarSenha, atualizarPerfil }}>
      {!carregando && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
