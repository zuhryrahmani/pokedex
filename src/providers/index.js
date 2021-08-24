import React, { useState, useEffect, useContext, createContext } from "react";
export const Hooks = createContext();
const Index = (props) => {
  const [result, setResult] = useState([])
  const valx = {
    result, setResult
  };
  useEffect(() => {

  }, []);
  return <Hooks.Provider value={valx}>{props.children}</Hooks.Provider>;
};

export default Index;
