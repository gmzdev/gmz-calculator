import * as React from "react";
import { render } from "react-dom";
import { Layout } from "./components/Layout.tsx";

import "bootstrap/dist/css/bootstrap.css";

import "./styles.css";

function App() {
  return <Layout />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
