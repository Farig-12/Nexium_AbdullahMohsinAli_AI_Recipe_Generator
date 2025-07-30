"use client"
import { createContext, useState, useContext } from "react"

const LoginContext = createContext();

export function AppWrapper({ children }) {
  const [isloggedin, setIsloggedin] = useState(false);

  return (
    <LoginContext.Provider value={{ isloggedin, setIsloggedin }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
