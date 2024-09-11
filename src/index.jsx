import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/MainView";
import "./index.scss";  
import { Container } from "react-bootstrap"; 

const App = () => {
  return (
    <Container className="my-5"> 
      <MainView />  
    </Container>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
