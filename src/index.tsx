import ReactDOM from "react-dom/client";
import App from "./App";
import { UsersContextProvider } from "./state";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <UsersContextProvider>
    <App />
  </UsersContextProvider>,
);
