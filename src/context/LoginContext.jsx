import { createContext, useContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [LoginName, setLoginName] = useState("");  
  const [LoginId, setLoginId] = useState(null);  

  return (
    <LoginContext.Provider value={{ LoginName, setLoginName, LoginId, setLoginId }}>
      {children}
    </LoginContext.Provider>
  );
}

export default function useLoginName() {
  return useContext(LoginContext);
}