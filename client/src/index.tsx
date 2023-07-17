import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    rootElement
  );
}

reportWebVitals();
