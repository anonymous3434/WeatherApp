import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppProvider from "./provider";
import Router from "./router";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
