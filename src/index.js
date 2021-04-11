import React from "react";
import ReactDOM from "react-dom";
import Room from "./Room";

import "./styles.css";

function App() {
  return (
    <>
      <Room />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
