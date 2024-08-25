import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { store } from "./redux/store";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <Toaster richColors />
  </StrictMode>
);
