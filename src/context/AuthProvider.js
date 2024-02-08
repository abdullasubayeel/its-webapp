import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isAddingTicketModal, setAddingTicketModal] = useState(false);

  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || true
  );

  const data = {
    auth,
    setAuth,
    persist,
    setPersist,
    isAddingTicketModal,
    setAddingTicketModal,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContext;
